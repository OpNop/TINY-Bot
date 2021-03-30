const Api = require('../Classes/Api');
const Embeds = require('../Classes/Embed');

module.exports = {
    name: 'key',
    description: 'Add API key to your account',
    async execute(message, args) {
        const key = args[0];

        //Check key length and format
        if (key.length != 72 && /([A-Z0-9]{8}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{20}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{12})/.test(key) == false) {
            message.author.send('That seems to be an invalid API key. Please try again.');
        } else {
            //Check that key has right perms (account and character)
            if (await Api.gw2.checkKey(key)) {
                //valid perms
                //Get Account
                let account = await Api.gw2.getAccount(key);
                //Link discord
                if (await Api.tiny.addDiscord(account, message.author.id)) {
                    //Save Key
                    if (await Api.tiny.addKey(account, key)) {
                        message.author.send(Embeds.linkSuccess(message.author, account));
                    } else {
                        message.author.send('Error Linking');
                    }
                } else {
                    message.author.send('Error Linking');
                }
            } else {
                //invalid perms
                message.author.send('Your API key needs to include `characters` permission');
            }
        }
    },
};