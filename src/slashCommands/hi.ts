// src/slashCommands/hi.ts

import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('hi')
    .setDescription('Get information about this bot'),
  async execute(interaction) {
    await interaction.reply('This bot is a helpful bot.');
  },
};

export default command;
