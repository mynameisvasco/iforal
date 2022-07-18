import { writable } from 'svelte/store';

export interface Modal {
	id: string;
	title: string;
	description: string;
	type: 'info' | 'danger';
	isOpen?: boolean;
	actionName: string;
	onCancel?: () => void;
	onAction?: () => void;
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
