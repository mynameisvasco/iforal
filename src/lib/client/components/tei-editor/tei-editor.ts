import { xml } from '@codemirror/lang-xml';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { keymap, dropCursor, lineNumbers } from '@codemirror/view';
import { Compartment, EditorState, Text } from '@codemirror/state';
import { indentOnInput } from '@codemirror/language';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import {
	autocompletion,
	startCompletion,
	snippetCompletion,
	completionKeymap
} from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { get } from 'svelte/store';
import { theme } from '$lib/client/theme';
import { editorDarkTheme, editorLightTheme } from './tei-editor-theme';
import { tagsMenu } from '$lib/client/tags';
import { editorSettings } from '../stores/editor-settings';
import { ViewPlugin } from '@codemirror/view';
import { debounce } from '$lib/common/debouce';

export function createTeiEditor(
	parent: HTMLElement,
	initalContent: string = '',
	handleAutosave: Function
) {
	const autosave = ViewPlugin.fromClass(
		class {
			constructor(view: EditorView) {
				const self: any = this;
				self.buffer = [];
				self.deboucer = debounce(() => {
					handleAutosave(self.buffer);
					self.buffer = [];
				}, 2000);
			}

			update(update: ViewUpdate) {
				if (!update.docChanged) return;
				const self: any = this;
				self.buffer.push(update.changes);
				self.deboucer();
			}
		}
	);

	const editorTheme = new Compartment();
	const state = EditorState.create({
		doc: initalContent,
		extensions: [
			xml({
				elements: get(tagsMenu).map((t) => ({
					name: t.name,
					attributes: (t.attributes as any).map((a: any) => ({
						name: a.name,
						values: a.values.split(',')
					}))
				}))
			}),
			lineNumbers(),
			history(),
			dropCursor(),
			indentOnInput(),
			autocompletion(),
			keymap.of([
				indentWithTab,
				...defaultKeymap,
				...historyKeymap,
				...lintKeymap,
				...completionKeymap
			]),
			editorTheme.of(get(theme) === 'dark' ? editorDarkTheme : editorLightTheme),
			autosave
		]
	});

	const editor = new EditorView({ state, parent });
	theme.subscribe((t) => {
		editor.dispatch({
			effects: editorTheme.reconfigure(t === 'dark' ? editorDarkTheme : editorLightTheme)
		});
	});

	editorSettings.subscribe((s) => {
		const editorElement = document.getElementsByClassName('cm-editor');
		if (editorElement.length === 1) {
			(editorElement[0] as HTMLElement).style.fontSize = `${s.fontSize}px`;
		}
	});

	return editor;
}
