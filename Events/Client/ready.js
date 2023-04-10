const { Client } = require("discord.js")

module.exports = {
	name: "ready",
	once: true,
	/**
	 * 
	 * @param {Client} client 
	 */
	execute(client) {
		console.log(`[READY] ${client.user.tag} is now up!`)
		client.user.setActivity("with Chat GPT")
	}
}