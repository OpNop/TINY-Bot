const Embeds = require('../Classes/Embed');

module.exports = {
    name: 'verify',
    description: 'Only needed if you did not get a DM from the bot.',
    execute(message, args) {
        message.reply('One verification, coming right up! Check your DM\'s');
        message.member.send(Embeds.linkGuild());
    },
};