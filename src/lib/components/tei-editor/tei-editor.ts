import { browser } from '$app/env';
import { editorSettings } from '$lib/stores/editor-settings';
import type { Editor } from 'codemirror';
import { get } from 'svelte/store';
import { theme } from '../../stores/theme';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/ayu-dark.css';

export async function createEditor(): Promise<Editor> {
	let editor: Editor | undefined;

	if (!browser) {
		return {} as Editor;
	}

	await import('codemirror/addon/hint/xml-hint');
	// @ts-ignore
	await import('codemirror/mode/xml/xml');
	await import('codemirror/addon/display/rulers');
	let CodeMirror = (await import('codemirror')).default;

	editor = CodeMirror.fromTextArea(document.getElementById('editor') as HTMLTextAreaElement, {
		mode: 'application/xml',
		lineNumbers: true,
		tabSize: 4,
		theme: get(theme) === 'dark' ? 'ayu-dark' : 'default'
	});

	editor!.setSize('100%', '700');
	editor!.refresh();

	theme.subscribe((t) => {
		editor?.setOption('theme', t === 'dark' ? 'ayu-dark' : 'default');
	});

	editorSettings.subscribe((s) => {
		let elements = document.querySelectorAll('.CodeMirror *');

		for (let element of Array.from(elements)) {
			(element as HTMLElement).style.fontSize = s.fontSize + 'px';
		}
		console.log(elements);
	});

	return editor as Editor;
}
