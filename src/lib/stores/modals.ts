import { writable } from 'svelte/store';

export interface Modal {
	id: string;
	title: string;
	description: string;
	icon: any;
	action: () => void;
	isOpen?: boolean;
	actionName: string;
	actionColor?: string;
}

function createModals() {
	const store = writable([] as Modal[]);

	function open(modal: Modal) {
		store.update((old) => [...old, { ...modal, isOpen: true }]);
	}

	function close(id: string) {
		store.update((old) => old.filter((m) => m.id !== id));
	}

	return { ...store, open, close };
}

export const modals = createModals();
