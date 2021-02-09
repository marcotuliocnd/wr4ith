const TwitchClient = require('./src/config/twitch');
const Server = require('./src/config/server');
const COMMANDS_SWITCHER = require('./src/config/commands');

require('dotenv').config();

async function bootstrap() {
    await TwitchClient.connect();
    Server.listen(process.env.PORT || 9999);
    console.log('> Bot connected')

    TwitchClient.on('message', messageCallback)
}

const messageCallback = async (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) return;

    const commandTagOnMessage = message.split(/(\s+)/)[0];

    const genericFunctionExecuter = COMMANDS_SWITCHER[commandTagOnMessage] || COMMANDS_SWITCHER['INVALID_FUNCTION'];

    await genericFunctionExecuter({ message, tags, channel, self });
};

bootstrap();
