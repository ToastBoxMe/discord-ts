import { Client, Events, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SlashCommand } from './types.js';
import configData from './config.js';

config();

// Support __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection<string, SlashCommand>();

const slashCommandsArr = [];

const commandsPath = path.join(__dirname, 'slashCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const commandModule = await import(`file://${filePath}`);
  const command = commandModule.default as SlashCommand;

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    slashCommandsArr.push(command.data.toJSON());
  } else {
    console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Register commands to Discord
const rest = new REST({ version: '10' }).setToken(configData.token);

try {
  console.log('🔁 Registering slash commands with Discord...');
  await rest.put(
    Routes.applicationGuildCommands(configData.clientId, configData.guildId),
    { body: slashCommandsArr }
  );
  console.log('✅ Slash commands registered!');
} catch (error) {
  console.error('❌ Failed to register slash commands:', error);
}

client.once(Events.ClientReady, c => {
  console.log(`🤖 Bot ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`❌ No command matching ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('❌ Error executing command:', error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

client
    .login(token)
    .catch((error) => console.error("Discord.Client.Login.Error", error));
