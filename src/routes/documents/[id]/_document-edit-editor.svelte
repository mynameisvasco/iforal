<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { EditorView } from '@codemirror/view';
	import { tagToString } from '$lib/common/tags';
	import DocumentEditEditorSettingsMenu from './_document-edit-editor-settings-menu.svelte';
	import DocumentEditEditorTagsMenu from './_document-edit-editor-tags-menu.svelte';
	import { createTeiEditor } from '$lib/client/editor';
	import { page } from '$app/stores';

	export let body: string;

	const documentId = parseInt($page.params.id);
	let editor = writable({} as EditorView);
	setContext('editor', editor);

	function handleApplyTag({ detail }: CustomEvent) {
		const [range] = $editor.state.selection.ranges;
		const text = $editor.state.sliceDoc(range.from, range.to);
		$editor.dispatch($editor.state.replaceSelection(tagToString(detail.tag, text)));
	}

	onMount(async () => {
		const element = document.getElementById('editor') as HTMLElement;
		$editor = createTeiEditor(element, documentId, body);
	});
</script>

<div class="h-full">
	<div
		class="flex items-center justify-between gap-1 w-full bg-stone-50 dark:bg-stone-900 p-1 rounded-t-md border 
		border-stone-300 dark:border-stone-700"
	>
		<DocumentEditEditorTagsMenu on:applyTag={handleApplyTag} />
		<DocumentEditEditorSettingsMenu />
	</div>
	<div id="editor" />
</div>
