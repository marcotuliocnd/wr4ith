const TwitchClient = require('../config/twitch');

const LINK_REGEX = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

const gatherMessageWithClipsCommand = async ({ message, channel, tags }) => {
    const link = sanitizeLink(message);

    if (!confirmStringIsLink(link) || !confirmLinkIsATwitchLink(link)) {
        await TwitchClient.say(channel, `@${tags.username} o link que vc enviou não é um clip da twitch!`);
        return;
    }

    await TwitchClient.say(channel, `@${tags.username} seu clip foi salvo para análise!`);

    console.log({
        link,
        username: tags.username,
        display_name: tags['display-name'],
        channel,
    });
}

const confirmStringIsLink = (string = '') => {
    return LINK_REGEX.test(string);
}

const confirmLinkIsATwitchLink = (link = '') => {
    try {
        const url = new URL(`https://${link}`);
        return url.host === 'clips.twitch.tv';
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

const sanitizeLink = (message = '') => {
    return (message.match(LINK_REGEX) || [])[0];
}

module.exports = {
    gatherMessageWithClipsCommand,
};
