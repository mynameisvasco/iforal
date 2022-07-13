import { browser } from '$app/env';
import { editorSettings } from '$lib/components/stores/editor-settings';
import type { Editor } from 'codemirror';
import 'codemirror/lib/codemirror.css';

export async function createEditor(): Promise<Editor> {
	let editor: Editor | undefined;

	if (!browser) {
		return {} as Editor;
	}

	await import('codemirror/addon/hint/xml-hint');
	// @ts-ignore
	await import('codemirror/mode/xml/xml');
	await import('codemirror/addon/display/rulers');
	await import('codemirror/addon/edit/closetag');

	let CodeMirror = (await import('codemirror')).default;

	editor = CodeMirror.fromTextArea(document.getElementById('editor') as HTMLTextAreaElement, {
		mode: 'application/xml',
		autoCloseTags: true,
		lineNumbers: true,
		tabSize: 4,
		pollInterval: 100
	});

	editor!.setSize('100%', '750');
	editor!.refresh();

	editorSettings.subscribe((s) => {
		let elements = document.querySelectorAll('.CodeMirror *');

		for (let element of Array.from(elements)) {
			(element as HTMLElement).style.fontSize = s.fontSize + 'px';
		}
	});

	return editor as Editor;
}
