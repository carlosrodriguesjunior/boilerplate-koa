//TODO: Configurar email
const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '----',
        pass: '----'
    }
};

const web = "http://localhost:8080/#/";

const sendGridKey = '----';

module.exports = {
    smtpConfig,
    web,
    sendGridKey
};
