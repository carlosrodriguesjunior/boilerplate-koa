const OAuthToken = require('../models/oAuthTokenModel').OAuthToken;
const OAuthClient = require('../models/oAuthClientModel').OAuthClient;
const UserService = require('../services/userService');
const UserAccess = require('../models/userAccessModel').UserAccess;
const User = require('../models/userModel').User;
const request = require('request-promise');
const _ = require('lodash');

var model = module.exports;

model.getClient = function(clientId, clientSecret, next) {
    OAuthClient.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    }).then(function(client) {
        return next(false, clientId);
    }).catch(function(err) {
        console.log('invalid client');
    });
};

model.grantTypeAllowed = function(clientId, grantType, next) {
    if (['password'].indexOf(grantType) !== -1) {
        return next(false, true);
    }
};

model.getUser = function(username, password, next) {

    if (username === 'facebookUser') {

        request.get('https://graph.facebook.com/me?fields=id&access_token=' + password, {})
            .then(function(facebookData) {
                facebookData = JSON.parse(facebookData);

                return User.findOne({
                    'facebook.id': facebookData.id
                });

            }).then(function(user) {
                if (!user)
                    return next();
                return next(null, user._id);

            })
            .catch(function(err) {
                return next(err);
            });

    }

    if (username !== 'facebookUser') {

        User.findOne({
            username: {
                $regex: username,
                $options: 'i'
            }
        }).then(function(user) {
            if (!user)
                return next();

            if (!UserService.validPassword(user.password, password))
                return next();

            return next(null, user._id);

        }).catch(function(err) {
            return next(err);
        });

    }

};

model.saveAccessToken = function(token, clientId, expires, userId, next) {
    let accessToken = new OAuthToken({
        accessToken: token,
        clientId: clientId,
        user: userId,
        expires: expires
    });

    let invalidUserClient;

    User.findOne({
            _id: userId
        })
        .populate('oauthClients')
        .then(function(user) {
            if (!_.some(user.oauthClients, ['clientId', clientId])) {
                throw ('InvalidClient for this user');
            }

            return UserAccess.create({
                user: userId
            });
        })
        .then(function(userLog) {
            return accessToken.save();
        })
        .then(function(accessTokenSuccess) {
            next(null, accessTokenSuccess);
        })
        .catch(function(err) {
            next(err);
        });

};

model.getAccessToken = function(bearerToken, next) {
    OAuthToken.findOne({
        accessToken: bearerToken
    }, next);
};