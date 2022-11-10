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
//@ts-ignore
import CETEIcean from 'CETEIcean';
import { EditorUtils } from '$lib/util';
import { api } from '$lib/api';

interface EditorSettings {
	fontSize: number;
	isFullWidth: boolean;
	isViewerMode: boolean;
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
		isFullWidth: false,
		isViewerMode: false
	} as EditorSettings);

	return { ...store };
}

function iforalPlugin(documentId: number, viewer: HTMLElement) {
	const plugin = ViewPlugin.fromClass(
		class {
			private timeout: NodeJS.Timeout | undefined;
			private changesBuffer: ChangeSet[] = [];
			private editor: EditorView;
			private reader: any;
			private isBusy: boolean = false;

			constructor(editor: EditorView) {
				this.editor = editor;
				this.reader = new CETEIcean();
				this.reader.addBehaviors(EditorUtils.getTranscriptionTEIBehavior());
				this.reader.makeHTML5(
					EditorUtils.addTeiBeginTag(this.editor.state.doc.toString()),
					(data: any) => {
						viewer.appendChild(data);
					}
				);
			}

			async update(update: ViewUpdate) {
				if (update.docChanged) {
					this.changesBuffer.push(update.changes);
					clearTimeout(this.timeout);
					this.timeout = setTimeout(async () => {
						while (this.isBusy) {
							await new Promise((resolve) => setTimeout(() => resolve(null), 500));
						}

						this.isBusy = true;
						await api.put(window.fetch, `/documents/${documentId}/body`, {
							changes: this.changesBuffer
						});

						this.changesBuffer = [];
						this.isBusy = false;
					}, 1500);

					this.reader.makeHTML5(
						EditorUtils.addTeiBeginTag(update.state.doc.toString()),
						(data: any) => {
							viewer.innerHTML = '';
							viewer.appendChild(data);
						}
					);
				}
			}
		}
	);

	return plugin;
}

export const editorSettings = createEditorSettings();

export function createTeiEditor(
	editorElement: HTMLElement,
	viewerElement: HTMLElement,
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
			iforalPlugin(document.id, viewerElement),
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
		const viewerElement = window.document.getElementById('viewer');

		if (editorElement.length === 1) {
			(editorElement[0] as HTMLElement).style.fontSize = `${s.fontSize}px`;
			viewerElement!.style.fontSize = `${s.fontSize}px`;
		}
	});

	return editor;
}
