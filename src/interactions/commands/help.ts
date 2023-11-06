import {
	type APIApplicationCommandOptionChoice,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';
import { newSlashCommand } from '../../structures/BotClient';

const data = new SlashCommandBuilder()
	.setName('help')
	.setDescription('See helpful information about this bot');

export default newSlashCommand({
	data,
	execute: async (i) => {
		return i.reply({
			content: 'This command has not yet been implemented.',
			ephemeral: true,
		});
	},
});
