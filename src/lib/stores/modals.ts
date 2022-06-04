import { writable } from 'svelte/store';
import { v4 as uuidV4 } from 'uuid';

export interface Modal {
	id?: string;
	title: string;
	description: string;
	icon: any;
	actionName: string;
	action: () => void;
	isOpen?: boolean;
}

function createModals() {
	const store = writable([] as Modal[]);

	function open(id: string) {
		store.update((old) => old.map((m) => (m.id === id ? { ...m, isOpen: true } : m)));
	}

	function close(id: string) {
		store.update((old) => old.map((m) => (m.id === id ? { ...m, isOpen: false } : m)));
	}

	function add(modal: Modal) {
		const id = uuidV4();
		store.update((old) => [...old, { ...modal, id }]);
		return id;
	}

	return { ...store, open, close, add };
}

export const modals = createModals();
