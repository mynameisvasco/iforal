import { browser } from '$app/environment';
import type { Tag } from '@prisma/client';
import { writable } from 'svelte/store';
import { api } from './api';

function createTagsMenu() {
	const store = writable([] as Tag[]);

	if (browser) {
		api.get<Tag[]>(fetch, '/tags/menu').then((data) => store.set(data ?? []));
	}

	return { subscribe: store.subscribe };
}

export const tagsMenu = createTagsMenu();
