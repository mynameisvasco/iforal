import { xml } from '@codemirror/lang-xml';
import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { keymap, rectangularSelection, lineNumbers } from '@codemirror/view';
import { ChangeSet, Compartment, EditorState } from '@codemirror/state';
import { indentOnInput, bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { lintKeymap, lintGutter, linter, type Diagnostic } from '@codemirror/lint';
import { get } from 'svelte/store';
import { theme } from '$lib/client/theme';
import { tagsMenu } from '$lib/client/tags';
import { writable } from 'svelte-local-storage-store';
import { editorDarkTheme, editorLightTheme } from './editor-theme';
import { api } from './api';
import { syntaxTree } from '@codemirror/language';
import { debounce } from '$lib/common/debouce';
import { searchKeymap, highlightSelectionMatches, search } from '@codemirror/search';

const xmlTagLinter = linter((view) => {
	let diagnostics: Diagnostic[] = [];
	syntaxTree(view.state)
		.cursor()
		.iterate((node) => {
			if (node.type.name === 'MissingCloseTag') {
				diagnostics.push({
					from: node.from,
					to: node.to,
					severity: 'error',
					message: `Falta o fim da marcação da tag`
				});
			}
			if (node.type.name === 'MismatchedCloseTag') {
				diagnostics.push({
					from: node.from,
					to: node.to,
					severity: 'error',
					message: `O fim da marcação não corresponde ao início da marcação`
				});
			}
		});
	return diagnostics;
});

interface EditorSettings {
	fontSize: number;
	editorColSize: number;
}

function createEditorSettings() {
	const store = writable('editor', { fontSize: 18, editorColSize: 8 } as EditorSettings);

	return { ...store };
}

function collabortative(documentId: number) {
	const plugin = ViewPlugin.fromClass(
		class {
			private buffer: ChangeSet[] = [];
			private deboucedUpdate = debounce(async () => {
				await api.put(fetch, `/documents/${documentId}`, { changes: this.buffer });
				this.buffer = [];
			}, 1500);

			constructor(private view: EditorView) {}

			async update(update: ViewUpdate) {
				if (update.docChanged) {
					this.buffer.push(update.changes);
					this.deboucedUpdate();
				}
			}
		}
	);

	return plugin;
}

export const editorSettings = createEditorSettings();

export function createTeiEditor(parent: HTMLElement, documentId: number, body: string) {
	const editorTheme = new Compartment();

	const state = EditorState.create({
		doc: body,
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
			foldGutter(),
			indentOnInput(),
			bracketMatching(),
			autocompletion(),
			rectangularSelection(),
			lintGutter(),
			collabortative(documentId),
			highlightSelectionMatches(),
			search({ top: true }),
			xmlTagLinter,
			editorTheme.of(get(theme) === 'dark' ? editorDarkTheme : editorLightTheme),
			keymap.of([
				...defaultKeymap,
				...historyKeymap,
				...foldKeymap,
				...completionKeymap,
				...lintKeymap,
				...searchKeymap,
				indentWithTab
			])
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
