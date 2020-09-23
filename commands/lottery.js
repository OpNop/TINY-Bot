const { prefix } = require('../config.json');

module.exports = {
	name: 'lottery',
	description: 'Get information about the lottery',
	aliases: ['lotto'],
	execute(message, args) {
        let data;
        
        //Send current lottery pot
        data = new Discord.RichEmbed({
            title: "TINY Lottery Info",
            color: 0xdaa520,
            description: `The TINY Lottery is where your dreams can come true\r\n
            Basic Rules\r\n
            - 1 entry for every <:gold:687141628636430366> deposited\r\n
            - A Maximum of 5 entries can be earned per week per account\r\n
            - The winner will be pulled during Tiny Takeover Tuesday\r\n
            - Entry period is weekly starting from Tuesday at server reset\r\n
            - 3 Winners Every week\r\n
            \r\n
            *Prize amounts are estimates based on current entries and are subject to change.`,
            footer: {
                text: "Tiny Lottery Service",
                iconURL: "https://s.tinyarmy.org/wp-content/uploads/2018/12/fav_57.png"
            }
        });

		// if (!args.length) {
		// 	data.push('Here\'s a list of all my commands:');
		// 	data.push(commands.map(command => command.name).join(', '));
		// 	data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

		// 	return message.author.send(data, { split: true })
		// 		.then(() => {
		// 			if (message.channel.type === 'dm') return;
		// 			message.reply('I\'ve sent you a DM with all my commands!');
		// 		})
		// 		.catch(error => {
		// 			console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
		// 			message.reply('it seems like I can\'t DM you!');
		// 		});
		// }

		// const name = args[0].toLowerCase();
		// const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		// if (!command) {
		// 	return message.reply('that\'s not a valid command!');
		// }

		// data.push(`**Name:** ${command.name}`);

		// if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		// if (command.description) data.push(`**Description:** ${command.description}`);
		// if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		// data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};