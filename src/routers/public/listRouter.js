'use strict';

const Router = require('koa-router');

let listRouter = new Router();

listRouter.get('/', function*(next) {
    try {
        this.body = [{
                id: 1,
                nome: "valor 1"
            },
            {
                id: 2,
                nome: "valor 2"
            },
            {
                id: 3,
                nome: "valor 3"
            }
        ];
        this.status = 200;
    } catch (error) {
        this.body = error;
    }

});

module.exports = listRouter;