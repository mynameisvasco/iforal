import { writable } from 'svelte-local-storage-store';

interface EditorSettings {
	fontSize: number;
	editorColSize: number;
}

export function createEditorSettings() {
	const store = writable('editor', { fontSize: 18, editorColSize: 8 } as EditorSettings);

	return { ...store };
}

export const editorSettings = createEditorSettings();
