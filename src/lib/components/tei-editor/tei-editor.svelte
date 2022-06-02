<script lang="ts">
	import { createContextMenu } from '$lib/stores/context-menu';
	import ContextMenu from '../context-menu/context-menu.svelte';
	import { onMount } from 'svelte';
	import { teiEditorContextMenu } from './tei-editor-context-menu';
	import type { Editor } from 'codemirror';
	import { createEditor } from './tei-editor';

	let editor: Editor;
	const contextMenu = createContextMenu();

	onMount(async () => {
		editor = await createEditor();
	});

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
