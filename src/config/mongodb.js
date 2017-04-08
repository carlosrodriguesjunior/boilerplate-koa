var port = process.env.MONGO_PORT || 27017;
var local = process.env.MONGO_HOST || "mongodb://localhost:" + port + "/api";
var prod = process.env.MONGO_HOST || "mongodb://localhost:" + port + "/api";

const config = {
    local: {
        mode: 'local',
        port: port,
        url: local
    },
    prod: {
        mode: 'prod',
        port: port,
        url: prod
    }
}

const options = {
    server: {
        poolSize: 10,
        socketOptions: {
            keepAlive: 300000,
            connectTimeoutMS: 30000
        }
    }
};

module.exports = (mode) => {
    return {
        connection: mode == 'PROD' ? config.prod : config.local,
        options: options
    };
};