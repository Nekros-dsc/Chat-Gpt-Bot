const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, Client } = require("discord.js")
const { Configuration, OpenAIApi } = require("openai")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chat")
        .setDescription("Chat with me")
        .addStringOption((opt) => opt.setName("prompt").setDescription("Enter your promt").setRequired(true)),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute(interaction, client) {

        await interaction.deferReply()

        interaction.editReply({ embeds: [new EmbedBuilder().setAuthor({ name: `${client.user.username} is generating response...`, iconURL: client.user.displayAvatarURL() })] })

        try {
            const configuration = new Configuration({
                apiKey: client.config.openai.key,
            })

            const openai = new OpenAIApi(configuration)

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: interaction.options.getString("prompt"),
                temperature: 0,
                max_tokens: 2048
            })

            const Embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`**${interaction.options.getString("prompt")}**\n\n\`\`\`${response.data.choices[0].text}\`\`\``)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
                .setTimestamp()
                .setFooter({ text: client.user.username })

            return interaction.editReply({ embeds: [Embed] })
        } catch (error) {
            if (error) console.log(error)

            return interaction.editReply({embeds: [new EmbedBuilder().setAuthor({ name: `Quelque chose c'est mal passé. Merci d'essayer plus tard`, iconURL: client.user.displayAvatarURL() })]})
        }

    }
}