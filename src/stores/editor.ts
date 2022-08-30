import { xml } from '@codemirror/lang-xml';
import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { keymap, rectangularSelection, lineNumbers } from '@codemirror/view';
import { ChangeSet, Compartment, EditorState } from '@codemirror/state';
import { indentOnInput, bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { lintKeymap, lintGutter, linter, type Diagnostic } from '@codemirror/lint';
import { get } from 'svelte/store';
import { theme } from '$stores/theme';
import { writable } from 'svelte-local-storage-store';
import { editorDarkTheme, editorLightTheme } from '../lib/components/editor/editor-theme';
import { api } from '../lib/api';
import { syntaxTree } from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches, search } from '@codemirror/search';
import type { Tag } from '@prisma/client';

const xmlTagLinter = linter((view) => {
	let diagnostics: Diagnostic[] = [];
	syntaxTree(view.state)
		.cursor()
		.iterate((node) => {
			if (node.type.name === '⚠') {
				diagnostics.push({
					from: node.from,
					to: node.to,
					severity: 'error',
					message: `Erro de início/fim de marcação`
				});
			}
			if (node.type.name === 'MismatchedCloseTag') {
				diagnostics.push({
					from: node.from,
					to: node.to,
					severity: 'error',
					message: `Erro de início/fim de marcação`
				});
			}
		});
	return diagnostics;
});

interface EditorSettings {
	fontSize: number;
	isFullWidth: boolean;
	isEditorMode: boolean;
}

function createEditorSettings() {
	const store = writable('editor', {
		fontSize: 18,
		isFullWidth: false,
		isEditorMode: true
	} as EditorSettings);

	return { ...store };
}

function collabortative(documentId: number) {
	const plugin = ViewPlugin.fromClass(
		class {
			async update(update: ViewUpdate) {
				if (update.docChanged) {
					await api.put(fetch, `/documents/${documentId}`, { changes: update.changes });
				}
			}
		}
	);

	return plugin;
}

export const editorSettings = createEditorSettings();

export function createTeiEditor(
	parent: HTMLElement,
	documentId: number,
	body: string,
	tags: Tag[]
) {
	const editorTheme = new Compartment();

	const state = EditorState.create({
		doc: body,
		extensions: [
			xml({
				elements: tags.map((t) => ({
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
			search(),
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
