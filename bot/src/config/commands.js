const ClipsBots = require('../classes/ClipsBot');
const DefaultMessages = require('../classes/DefaultMessages');

const COMMAND_SWITCHER = {
    '!clips': ClipsBots.gatherMessageWithClipsCommand,
    '!ajuda': DefaultMessages.answerWithAllCommandsAvailable,
    '!getulix': DefaultMessages.answerWithAJokeWithGetulix,
    '!mag': DefaultMessages.answerWithAJokeWithMag,
    'INVALID_FUNCTION': DefaultMessages.answerWithInvalidCommand,
}

module.exports = COMMAND_SWITCHER;
