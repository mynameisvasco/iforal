<script lang="ts">
	import { createEventDispatcher, onMount, setContext } from 'svelte';
	import TeiEditorTagsMenu from './tei-editor-tags-menu.svelte';
	import TeiEditorSettings from './tei-editor-settings.svelte';
	import { writable } from 'svelte/store';
	import { createTeiEditor } from './tei-editor';
	import type { EditorView } from '@codemirror/view';
	import type { ChangeSet } from '@codemirror/state';
	import { tagToString } from '$lib/common/tags';

	export let value: string = '';

	let editor = writable({} as EditorView);
	const dispatcher = createEventDispatcher();
	setContext('editor', editor);

	function handleAutosave(changes: ChangeSet) {
		dispatcher('autosave', { changes });
	}

	function handleApplyTag({ detail }: CustomEvent) {
		const [range] = $editor.state.selection.ranges;
		const text = $editor.state.sliceDoc(range.from, range.to);
		$editor.dispatch($editor.state.replaceSelection(tagToString(detail.tag, text)));
	}

	onMount(async () => {
		const element = document.getElementById('editor') as HTMLElement;
		$editor = createTeiEditor(element, value, handleAutosave);
	});
</script>

<div class="h-full">
	<div
		class="flex items-center gap-1 w-full bg-stone-50 dark:bg-stone-900 p-1 rounded-t-md border 
		border-stone-300 dark:border-stone-700"
	>
		<TeiEditorTagsMenu on:applyTag={handleApplyTag} />
		<div class="flex flex-1 justify-end items-center gap-2">
			<TeiEditorSettings />
		</div>
	</div>
	<div id="editor" />
</div>
