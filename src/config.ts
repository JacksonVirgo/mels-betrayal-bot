import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
	DISCORD_TOKEN: z.string(),
	DISCORD_CLIENT_ID: z.string(),
});

export const env = envSchema.parse(process.env);

export default {
	...env,
};
