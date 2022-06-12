<script lang="ts">
	import { createContextMenu } from '$lib/stores/context-menu';
	import ContextMenu from '../context-menu/context-menu.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { teiEditorContextMenu } from './tei-editor-context-menu';
	import type { Editor, EditorChange } from 'codemirror';
	import { createEditor } from './tei-editor';

	let editor: Editor;
	let changes = [] as EditorChange[];
	let changeTimeout: NodeJS.Timeout;
	const contextMenu = createContextMenu();
	const dispatcher = createEventDispatcher();

	onMount(async () => {
		editor = await createEditor();
		editor.on('change', handleChange);
	});

	function handleChange(_: Editor, newChanges: EditorChange) {
		changes.push(newChanges);
		clearTimeout(changeTimeout);
		changeTimeout = setTimeout(() => dispatcher('change', changes), 1000);
	}

	function handleContextMenu(event: MouseEvent) {
		const selectedText = editor.getSelection();
		const coordinates = [event.clientX, event.clientY] as [number, number];
		contextMenu.toggle(coordinates);
	}

	contextMenu.setMenu(teiEditorContextMenu);
</script>

<ContextMenu {contextMenu} />

<div on:contextmenu|preventDefault={handleContextMenu} on:drag|preventDefault class="h-full">
	<input type="textarea" id="editor" />
</div>
