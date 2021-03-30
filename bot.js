const Api = require('./Classes/Api');
const { prefix, token, unverified_role } = require('./config.json');
const Discord = require('discord.js');
const Embeds = require('./Classes/Embed');
const fs = require('fs');
const Logger = require('./Classes/Log');

//Create the Client
const client = new Discord.Client();

//Load up commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', async () => {
    Logger.Log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    //Ignore non commands and bots
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Parse commands and args
    const args = message.content.slice(prefix.length).trim().split(/ +/);;
    const command = args.shift().toLowerCase();

    //Start "Typing"
    message.channel.startTyping()

    //Fire off the command
    if (client.commands.has(command)) {
        client.commands.get(command).execute(message, args);
    } else {
        message.reply('Invalid command');
    }

    //Stop "Typing"
    message.channel.stopTyping()
});

// Set role of new members and send welcome DM
client.on('guildMemberAdd', member => {
    let role = member.guild.roles.cache.get(unverified_role);
    Logger.Log(`New user joining: ${JSON.stringify(member, null, 2)}`);
    //set user as "Test Subject"
    member.roles.add(role);
    // DM them the Welcome Message
    member.send(Embeds.linkGuild());
});

client.login(token);