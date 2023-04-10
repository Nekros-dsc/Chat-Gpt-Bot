const { CommandInteraction } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 */
	execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return

		const command = client.commands.get(interaction.commandName)

		if (!command) {
			interaction.reply({ content: "Cette commande est obsolète", ephemeral: true })
			client.commands.delete(command)

			return
		}

		if (command.private && interaction.user.id !== client.config.developer) return interaction.reply({
			content: "Vous ne pouvez pas utiliser cette commande", ephemeral: true
		})

		command.execute(interaction, client)
	}
}