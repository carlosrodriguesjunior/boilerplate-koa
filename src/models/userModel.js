'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccessProfileSchema = require('./accessProfileModel').AccessProfileSchema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        state: {
            type: String
        },
        city: {
            type: String
        }

    },
    family: {
        children: {
            type: Number
        },
        adults: {
            type: Number
        }
    },
    settings: {
        song: {
            type: String
        },
        led: {
            type: Boolean
        },
        temperature: {
            type: Number
        },
        showerDuration: {
            type: Number
        },
        costs: {
            water: {
                type: Number
            },
            kWh: {
                type: Number
            },
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    facebook: {
        id: String,
        email: String,
        photo: String,
        authResponse: Object
    },
    google: {
        id: String,
        email: String,
        photo: String,
        authResponse: Object
    },
    forceToChangePassword: {
        type: Boolean,
        default: false
    },
    accessProfile: AccessProfileSchema,
    oauthClients: [{
        type: Schema.Types.ObjectId,
        ref: 'OAuthClient'
    }],
});

module.exports.UserSchema = UserSchema;
module.exports.User = mongoose.model('User', UserSchema);