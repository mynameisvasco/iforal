import { xml } from '@codemirror/lang-xml';
import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { keymap, rectangularSelection, lineNumbers } from '@codemirror/view';
import { Compartment, EditorState } from '@codemirror/state';
import { indentOnInput, bracketMatching, foldGutter, foldKeymap } from '@codemirror/language';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { lintKeymap, lintGutter, linter, type Diagnostic } from '@codemirror/lint';
import { get, type Writable } from 'svelte/store';
import { theme } from '$stores/theme';
import { writable } from 'svelte-local-storage-store';
import { editorDarkTheme, editorLightTheme } from '../lib/components/editor/editor-theme';
import { api } from '../lib/api';
import { syntaxTree } from '@codemirror/language';
import { searchKeymap, highlightSelectionMatches, search } from '@codemirror/search';
import type { Tag } from '@prisma/client';
//@ts-ignore
import CETEIcean from 'CETEIcean';
import { EditorUtils } from '$lib/util';

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

function iforalPlugin(updateForm: HTMLFormElement, viewer: HTMLElement) {
	const plugin = ViewPlugin.fromClass(
		class {
			private timeout: NodeJS.Timeout | undefined;
			private editor: EditorView;
			private reader: any;

			constructor(editor: EditorView) {
				this.editor = editor;
				this.reader = new CETEIcean();
				this.reader.addBehaviors(EditorUtils.getTEIBehavior());
				this.reader.makeHTML5(
					EditorUtils.addTeiBeginTag(this.editor.state.doc.toString()),
					(data: any) => {
						viewer.appendChild(data);
					}
				);
			}

			async update(update: ViewUpdate) {
				if (update.docChanged) {
					const changesInput = updateForm.elements.namedItem('changes') as HTMLInputElement;
					changesInput.value = update.state.doc.toString();
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						updateForm.dispatchEvent(new SubmitEvent('submit'));
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
	updateForm: HTMLFormElement,
	readonly: boolean,
	body: string,
	tags: Tag[]
) {
	const editorTheme = new Compartment();

	const state = EditorState.create({
		doc: body,
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
			iforalPlugin(updateForm, viewerElement),
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
		const editorElement = document.getElementsByClassName('cm-editor');
		const viewerElement = document.getElementById('viewer');

		if (editorElement.length === 1) {
			(editorElement[0] as HTMLElement).style.fontSize = `${s.fontSize}px`;
			viewerElement!.style.fontSize = `${s.fontSize}px`;
		}
	});

	return editor;
}
