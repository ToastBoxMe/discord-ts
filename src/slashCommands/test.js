import { SlashCommandBuilder, ChannelType, TextChannel, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";
const { SlashCommandBuilder } = require('discord.js');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Replies with Pong!'),
        async execute(interaction) {
            await interaction.reply('Pong!');
        },
    };
