import { error } from '$lib/util/api';
import type { RequestEvent } from '@sveltejs/kit';
import * as Fs from 'fs/promises';
import * as Path from 'path';

export async function get(event: RequestEvent) {
	const name = event.params.name;
	try {
		const file = await Fs.readFile(Path.join('storage', name));
		return {
			status: 200,
			body: file,
			headers: {
				'Content-Type': `image/${name.split('.')[1]}`
			}
		};
	} catch (e) {
		return error(404, "File doesn't exist");
	}
}
