import { browser } from '$app/env';
import type { Tag } from '@prisma/client';
import { writable } from 'svelte/store';

async function createTags() {
	const store = writable([] as Tag[]);

	if (browser) {
		const response = await fetch('/tags', { method: 'get' });
		const { data } = await response.json();
		store.set(data);
	}

	return { subscribe: store.subscribe };
}

export const tags = await createTags();
