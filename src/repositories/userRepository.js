'use strict';

const _ = require('lodash');
const User = require('../models/userModel').User;

class UserRepository {

    *
    findOne(user) {
        return yield User.findOne(user);
    }

    *
    create(user) {
        return yield User.create(user);
    }

    *
    update(user) {
        return yield User.update(user);
    }

};

module.exports = new UserRepository();