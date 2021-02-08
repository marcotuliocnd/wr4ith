const { Client } = require('tmi.js');

require('dotenv').config();

const twitchClient = new Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: 'wr4ithbot',
        password: process.env.TWITCH_OAUTH_TOKEN,
    },
    channels: ['marcotuliocnd'],
});

module.exports = twitchClient;