import config from './config';
import { BotClient } from './structures/BotClient';

export const client = new BotClient(
	config.DISCORD_CLIENT_ID,
	config.DISCORD_TOKEN,
	async (c) => {
		c.start();
	}
);
