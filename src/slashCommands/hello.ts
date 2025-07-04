// src/slashCommands/hello.ts

import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';

const command: SlashCommand = {
  ...new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Get information about this bot')
    .toJSON(), // Convert builder to raw data object
  async execute(interaction) {
    await interaction.reply('This bot is a helpful bot.');
  },
};

export default command;
