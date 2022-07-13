import { browser } from '$app/env';
import { get, writable } from 'svelte/store';

function createTheme() {
	const stored = browser ? localStorage.theme : 'white';
	const store = writable(stored || 'white');

	if (browser) {
		store.subscribe((value) => {
			localStorage.setItem('theme', value);

			if (value === 'white') {
				document.documentElement.classList.remove('dark');
			} else {
				document.documentElement.classList.add('dark');
			}
		});
	}

	function toggle() {
		if (get(store) === 'white') {
			store.set('dark');
		} else {
			store.set('white');
		}
	}

	return { subscribe: store.subscribe, toggle };
}

export const theme = createTheme();
