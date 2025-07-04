/*import type {SlashCommandBuilder, CommandInteraction, AutocompleteInteraction } from "discord.js"

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    cooldown?: number // in seconds
*/}
import { ChatInputApplicationCommandData, CommandInteraction } from 'discord.js';

export interface SlashCommand extends ChatInputApplicationCommandData {
  execute: (interaction: CommandInteraction) => Promise<void>;
}
