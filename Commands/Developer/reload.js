const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require("discord.js")
const { loadCommands } = require('../../Handlers/commandHandler')
const { loadEvents } = require('../../Handlers/eventHandler')

module.exports = {
	developer: true,
	private: true,
	data: new SlashCommandBuilder()
		.setName("reload")
		.setDescription("Reload your events/commands.")
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand((options) => options.setName("events").setDescription("Reload your events"))
		.addSubcommand((options) => options.setName("commands").setDescription("Reload your commands")),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	execute(interaction, client) {
		const sub = interaction.options.getSubcommand();

		switch (sub) {
			case "events": {
				loadEvents(client);
				interaction.reply({ content: "Rechargé les événements", ephemeral: true })
			}
				break;
			case "commands": {
				loadCommands(client);
				interaction.reply({ content: "Rechargé les commandes", ephemeral: true })
			}
				break;
		}
	}
}