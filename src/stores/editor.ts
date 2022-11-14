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
import { syntaxTree } from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches, search } from '@codemirror/search';
import type { Document, Tag } from '@prisma/client';
import { api } from '$lib/api';
import { notifications } from './notifications';

interface EditorSettings {
	fontSize: number;
	isFullWidth: boolean;
}

const xmlTagLinter = linter((view) => {
	let diagnostics: Diagnostic[] = [];
	syntaxTree(view.state)
		.cursor()
		.iterate((node) => {
			if (node.type.name === 'MissingCloseTag') {
				diagnostics.push({
					from: node.node.prevSibling?.from ?? node.from,
					to: node.node.prevSibling?.to ?? node.to,
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

function createEditorSettings() {
	const store = writable('editor', {
		fontSize: 18,
		isFullWidth: false
	} as EditorSettings);

	return { ...store };
}

function iforalPlugin(documentId: number) {
	const plugin = ViewPlugin.fromClass(
		class {
			private timeout: NodeJS.Timeout | undefined;
			private isBusy: boolean = false;

			async update(update: ViewUpdate) {
				if (update.docChanged) {
					clearTimeout(this.timeout);
					this.timeout = setTimeout(async () => {
						while (this.isBusy) {
							await new Promise((resolve) => setTimeout(() => resolve(null), 500));
						}

						this.isBusy = true;
						const response = await api.put<any>(window.fetch, `/documents/${documentId}/body`, {
							body: update.state.doc.toString()
						});

						if (response.error) {
							notifications.show({
								title: 'Erro',
								message: 'Houve um erro a guardar automaticamente',
								type: 'error'
							});
						}

						this.isBusy = false;
					}, 1500);
				}
			}
		}
	);

	return plugin;
}

export const editorSettings = createEditorSettings();

export function createTeiEditor(
	editorElement: HTMLElement,
	readonly: boolean,
	document: Document,
	tags: Tag[]
) {
	const editorTheme = new Compartment();

	const state = EditorState.create({
		doc: document.body,
		extensions: [
			EditorView.editable.of(!readonly),
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
			iforalPlugin(document.id),
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

	const editor = new EditorView({ state, parent: editorElement });
	theme.subscribe((t) => {
		editor.dispatch({
			effects: editorTheme.reconfigure(t === 'dark' ? editorDarkTheme : editorLightTheme)
		});
	});

	editorSettings.subscribe((s) => {
		const editorElement = window.document.getElementsByClassName('cm-editor');

		if (editorElement.length === 1) {
			(editorElement[0] as HTMLElement).style.fontSize = `${s.fontSize}px`;
		}
	});

	return editor;
}
