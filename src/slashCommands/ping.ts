import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../types';

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Replies with Pong!'),
  async execute(interaction) {
    const sent = await interaction.reply({
      content: 'Pong!',
      fetchReply: true,
    });
    interaction.editReply(
      `Roundtrip latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms`,
    );
  },
};

export default command;
