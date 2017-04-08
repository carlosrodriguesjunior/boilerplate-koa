'use strict';

const http = require('http');
const koa = require('koa');
const bodyParser = require('koa-body');
const cors = require('koa-cors');
const corsError = require('koa-cors-error');
const gzip = require('koa-gzip');
const mount = require('koa-mount');
const db = require('./db');
const api = require('./src/config/api');
const oauthServer = require('./src/oauth/oauthServer');

var server = module.exports = koa();

server.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    headers: ['Content-Type', 'Authorization']
}));
server.use(bodyParser());
server.use(corsError);
server.use(gzip());

require('./src/routers/public/index')(server);

server.use(mount('/api', oauthServer.authorise()));

require('./src/middlewares/index')(server);
require('./src/routers/private/index')(server);

db.connection.on('connected', () => {
    http.createServer(server.callback()).listen(api.port, () => {
        console.log('Server listening at http://localhost:' + api.port);
    });
});