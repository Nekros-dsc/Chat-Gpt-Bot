function loadCommands(client) {
	const fs = require('fs')

	let c = 0

	let commandsArray = []
	let developerArray = []

	const commandsFolders = fs.readdirSync("./Commands")
	for (const folder of commandsFolders) {
		const commandsFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith(".js"))

		for (const file of commandsFiles) {
			const commandsFile = require(`../Commands/${folder}/${file}`)

			client.commands.set(commandsFile.data.name, commandsFile)

			if (commandsFile.developer) developerArray.push(commandsFile.data.toJSON())
			else commandsArray.push(commandsFile.data.toJSON())

			c++
			continue
		}
	}

	client.application.commands.set(commandsArray)

	const developerGuild = client.guilds.cache.get(client.config.developerGuild)

	developerGuild.commands.set(developerArray)

	return console.log(`Loaded ${c} commands`)
}

module.exports = { loadCommands }