const TwitchClient = require('../config/twitch');

const AVAILABLE_COMANDS = [
    '!ajuda',
    '!clips',
    '!getulix',
    '!mag',
];

const answerWithInvalidCommand = async ({ channel, tags }) => {
    await TwitchClient.say(channel, `@${tags.username} o comando que vc digitou ta errado, digite !ajuda para ver o que posso fazer!`);
}

const answerWithAllCommandsAvailable = async ({ channel, tags }) => {
    await TwitchClient.say(channel, `@${tags.username} tente os comandos: ${AVAILABLE_COMANDS.join(', ')}`);
}

const answerWithAJokeWithGetulix = async ({ channel }) => {
    await TwitchClient.say(channel, 'Ganhamo - @GetulixBR');
}

const answerWithAJokeWithMag = async ({ channel }) => {
    await TwitchClient.say(channel, 'Eu ser macho markzMag');
}

module.exports = {
    answerWithAllCommandsAvailable,
    answerWithInvalidCommand,
    answerWithAJokeWithGetulix,
    answerWithAJokeWithMag,
};
