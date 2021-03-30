const Api = require('../Classes/Api');
const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'lottery',
    aliases: 'lotto',
    description: 'Get information about the lottery',
    async execute(message, args) {
        let data, pot, account;

        //Check for account name
        if (args.length) {
            account = /^.*\.\d{4}/g.exec(args.join(" "))[0];
        }

        if (account) {
            //Checking for users entries
            if (entries = await Api.tiny.getLotteryEntries(account)) {
                console.dir(entries);
                if (entries.tickets == 0) {
                    data = `I cant find any <:lotto_ticket:758522048309362708> for you 😯 If you just deposited, try again in about **5 minutes**.`;
                } else {
                    data = `you have ${entries.tickets} <:lotto_ticket:758522048309362708> in this weeks lottery 🎉`;
                }
                message.reply('Check your private messages for your results.');
                message.author.send(data);
            } else {
                message.channel.send("There was an issue looking up your entries, Please try again later.");
            }
        } else {
            //Send current lottery pot and info       

            //Get lottery pot
            if (pot = Api.tiny.getLotteryPot()) {
                data = new MessageEmbed()
                    .setTitle('TINY Lottery Info')
                    .setColor('#daa520')
                    .setTimestamp()
                    .setImage(`https://api.tinyarmy.org/v1/lottery/pot/image?${Date.now()}`)
                    .setFooter('Tiny Lottery Service', 'https://tinyarmy.org/wp-content/uploads/2018/12/fav_57.png')
                    .setDescription(`The TINY Lottery is where your dreams can come true
    
                **Basic Rules**
                - 1 entry for every <:gold:687141628636430366> deposited
                - A Maximum of 10 entries can be earned per week per account
                - 3 winners will be pulled during Tiny Takeover Tuesday
                - Entry period is weekly starting from Tuesday at server reset
                
                *Prize amounts are estimates based on **current** entries and are subject to change.`)

                message.channel.send(data);
            } else {
                message.channel.send("There was an issue looking the lottery stats, Please try again later.");
            }
        }
    },
};