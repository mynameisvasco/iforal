import { writable } from 'svelte-local-storage-store';

export type ViewMode = 'transcription' | 'edited';

export interface ViewerSettings {
	fontSize: number;
	mode: ViewMode;
	pages: Map<number, number>;
}

function createViewerSettings() {
	const store = writable('viewer', {
		fontSize: 15
	} as ViewerSettings);

	return store;
}

export const viewerSettings = createViewerSettings();
