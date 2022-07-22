import { createClient } from 'redis';

async function createRedis() {
	const client = createClient();
	await client.connect();
	return client;
}

export const redis = await createRedis();
