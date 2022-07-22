import { browser } from '$app/env';
import type { Tag } from '@prisma/client';
import { writable } from 'svelte/store';

function createTagsMenu() {
	const store = writable([] as Tag[]);

	if (browser) {
		fetch('/tags/menu')
			.then((response) => response.json())
			.then(({ data }) => store.set(data));
	}

	return { subscribe: store.subscribe };
}

export const tagsMenu = createTagsMenu();
