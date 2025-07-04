
import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Get information about this bot'),
  async execute(interaction) {
    await interaction.reply('This bot is a helpful bot.');
  },
};

export default command;
