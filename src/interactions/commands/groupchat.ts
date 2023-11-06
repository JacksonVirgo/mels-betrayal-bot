import {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ActionRowBuilder,
	UserSelectMenuBuilder,
} from 'discord.js';
import { newSlashCommand } from '../../structures/BotClient';
import groupchat from '../selectmenu/groupchat';

const data = new SlashCommandBuilder()
	.setName('groupchat')
	.setDescription('Create a group chat with other members.')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export default newSlashCommand({
	data,
	execute: async (i) => {
		const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
			new UserSelectMenuBuilder()
				.setCustomId(groupchat.getCustomID())
				.setMinValues(2)
				.setMaxValues(25)
				.setPlaceholder('Select members to add to the group chat.')
		);

		return i.reply({
			content:
				'Select anywhere from 2 to 25 people to create a group chat with. You will automatically add yourself whether you select yourself or not',
			components: [row],
			ephemeral: true,
		});
	},
});
