import { writable, type Readable, type Subscriber, type Unsubscriber } from 'svelte/store';

export interface MenuItem {
	name: string;
	subMenu?: MenuItem[];
	action?: () => void;
}

export interface ContextMenuStore {
	subscribe: (
		this: void,
		run: Subscriber<{
			menu: MenuItem[];
			isOpened: boolean;
			coordinates: [number, number];
		}>,
		invalidate?: any
	) => Unsubscriber;
	toggle: (coordinates: [number, number]) => void;
	setMenu: (items: MenuItem[]) => void;
}

export function createContextMenu(menu?: MenuItem[]): ContextMenuStore {
	const store = writable({
		menu: menu ?? ([] as MenuItem[]),
		isOpened: false,
		coordinates: [0, 0] as [number, number]
	});

	function setMenu(items: MenuItem[]) {
		store.update((old) => ({ ...old, menu: items }));
	}

	function toggle(coordinates: [number, number]) {
		if (coordinates[0] !== 0 && coordinates[1] !== 0) {
			store.update((old) => ({ ...old, isOpened: true, coordinates }));
		} else {
			store.update((old) => ({ ...old, isOpened: false }));
		}
	}

	return { subscribe: store.subscribe, setMenu, toggle };
}
