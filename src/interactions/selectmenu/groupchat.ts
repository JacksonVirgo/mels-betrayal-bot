import { type CategoryChannel, ChannelType, type Guild, type OverwriteResolvable } from 'discord.js';
import { SelectMenu } from '../../structures/interactions';
import { getRandomChannelName } from '../../utils/random';

async function createOrFetchCategory(guild: Guild, categoryName: string, maxCategories: number = 10): Promise<CategoryChannel | null> {
	try {
		await guild.channels.fetch();

		let category = guild.channels.cache.find(
			(channel) => channel.type === ChannelType.GuildCategory && channel.name === categoryName
		) as CategoryChannel;
		if (category && category.children.cache.size >= maxCategories) {
			for (let i = 2; i <= maxCategories; i++) {
				const nextCategoryName = `${categoryName} ${i}`;
				const existingCategory = guild.channels.cache.find(
					(channel) => channel.type === ChannelType.GuildCategory && channel.name === nextCategoryName
				) as CategoryChannel;

				if (!existingCategory) {
					category = await guild.channels.create({
						name: nextCategoryName,
						type: ChannelType.GuildCategory,
					});
					break;
				}
			}
		} else if (!category) {
			category = await guild.channels.create({
				name: categoryName,
				type: ChannelType.GuildCategory,
			});
		}

		return category;
	} catch (err) {
		return null;
	}
}

export default new SelectMenu('create-group-chat').onExecute(async (i) => {
	if (!i.guild)
		return i.reply({
			content: 'This select menu is not available in DMs.',
			ephemeral: true,
		});
	if (!i.channel || i.channel.type != ChannelType.GuildText)
		return i.reply({
			content: 'This select menu is not available outside of a text channel.',
			ephemeral: true,
		});
	if (!i.isUserSelectMenu()) return i.reply({ content: 'This interaction ', ephemeral: true });

	const memberIDs = i.values.filter((v) => v != i.user.id);

	if (memberIDs.length < 2)
		return await i.reply({
			content: 'You need to select at least 2 other users to create a group chat.',
			ephemeral: true,
		});

	await i.deferReply({ ephemeral: true });

	try {
		const groupChatCategory = await createOrFetchCategory(i.guild, 'Group Chats');
		if (!groupChatCategory) throw new Error();

		const randomChannelName = getRandomChannelName();
		const channelOverwrites: OverwriteResolvable[] = [
			{
				id: i.guild.roles.everyone.id,
				deny: ['ViewChannel'],
			},
			{
				id: i.user.id,
				allow: ['ViewChannel'],
			},
		];

		for (const memberID of memberIDs) {
			channelOverwrites.push({
				id: memberID,
				allow: ['ViewChannel'],
			});
		}
		const channel = await i.guild.channels.create({
			name: randomChannelName,
			parent: groupChatCategory,
			permissionOverwrites: channelOverwrites,
		});

		if (!channel) throw new Error();

		await channel.send({
			content: `This group chat was created by <@${i.user.id}>`,
		});

		return await i.editReply({
			content: `The group chat for ${memberIDs.length + 1} users can be found here -> <#${channel.id}>`,
		});
	} catch (err) {
		return await i.editReply({
			content: 'Something went wrong while creating the group chat.',
		});
	}
});
