const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'lottery',
    description: 'Get information about the lottery',
    aliases: ['lotto'],
    execute(message, args) {
        let account = null;
        let data;

        //Check for account name
        if (args.length) {
            account = args.join(" ");
        }

        if (account) {
            //Checking for users entries
            data = "Not implemented yet";
            axios.get(`${config.api_base}/lottery/${account}/entries`)
                .then(res => {
                    if(res.data.tickets == 0)
                    {
                        data = `I cant find any <:lotto_ticket:758522048309362708> for you 😯 If you just deposited, try again in about **1 minute**.`;
                    } else {
                        //<:lotto_ticket:758522048309362708>
                        data = `you have ${res.data.tickets} <:lotto_ticket:758522048309362708> in this weeks lottery 🎉`;
                    }
                    message.reply(data);
                })
                .catch(err => {
                    message.channel.send(err);
                })
            //message.channel.send(data);
        } else {
            //Send current lottery pot and info       

            //Get lottery pot
            axios.get(`${config.api_base}/lottery/pot`)
                .then(res => {
                    let pot = res.data;
                    data = new MessageEmbed()
                        .setTitle("TINY Lottery Info")
                        .setColor('#daa520')
                        .setTimestamp()
                        .setFooter("Tiny Lottery Service", "https://s.tinyarmy.org/wp-content/uploads/2018/12/fav_57.png")
                        .setDescription(`The TINY Lottery is where your dreams can come true
            
                        **Basic Rules**
                        - 1 entry for every <:gold:687141628636430366> deposited
                        - A Maximum of 5 entries can be earned per week per account
                        - The winner will be pulled during Tiny Takeover Tuesday
                        - Entry period is weekly starting from Tuesday at server reset
                        - 3 Winners Every week
                        
                        *Prize amounts are estimates based on **current** entries and are subject to change.`)
                        .addField("1st Place", coins2gold(pot.first), true)
                        .addField("2nd Place", coins2gold(pot.second), true)
                        .addField("3rd Place", coins2gold(pot.third), true)

                    message.channel.send(data);
                })
                .catch(err => {
                    data = err;
                    message.channel.send(data);
                })
        }
    },
};

function coins2gold(coins) {
    const copper = coins % 100,
        silver = ~~((coins % 10000) / 100),
        gold = ~~((coins % 1000000) / 10000);
    const result = [];
    //less than 1 Silver
    if (!silver && !gold) {
        return `${copper} <:copper:687141688157667335>`;
    } else {
        if (gold) {
            result.push(`${gold} <:gold:687141628636430366>`);
        }
        result.push(`${silver} <:silver:687141687985832003>`);
    }

    return result.join(' ');

    //<:copper:687141688157667335> <:gold:687141628636430366> <:silver:687141687985832003>
}