import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../types";

const hellocommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Greets the user and provides info")
        .addStringOption(option =>
            option
                .setName("content")
                .setDescription("Optional input to include in the greeting")
                .setRequired(false)
        ),
    execute: async (interaction) => {
        const options: { [key: string]: string | number | boolean } = {};
        for (let i = 0; i < interaction.options.data.length; i++) {
            const element = interaction.options.data[i];
            if (element.name && element.value) options[element.name] = element.value;
        }

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: "🤖 Hello from your bot!" })
                    .setDescription(`This bot is a helpful bot.
                    
Your ping: ${interaction.client.ws.ping}ms
Your input: ${options.content ?? "None provided"}`)
            ]
        });
    },
    cooldown: 3
};

export default hellocommand;
