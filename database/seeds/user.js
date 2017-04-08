"use strict";

const _ = require('lodash');
const User = require("../../src/models/userModel").User;
const UserService = require('../../src/services/userService');

module.exports = (accessProfile, oauthClients) => (
    [
        new User({
            login: 'app@api',
            password: UserService.generateHash('app@123'),
            name: 'Usuário api',
            phone: '11-999999999',
            email: 'app@api',
            username: 'app@api',
            accessProfile: accessProfile[0],
            oauthClients: [_.find(oauthClients, oauthClient => oauthClient.clientId === 'app')]
        })
    ]
);