import { writable } from 'svelte/store';

export interface Notification {
	title: string;
	message: string;
	type: 'success' | 'error';
}

function createNotifications() {
	const store = writable([] as Notification[]);

	function show(modal: Notification) {
		store.update((old) => [...old, { ...modal }]);
	}

	function close(title: string) {
		store.update((old) => old.filter((n) => n.title !== title));
	}

	return { ...store, show, close };
}

export const notifications = createNotifications();
