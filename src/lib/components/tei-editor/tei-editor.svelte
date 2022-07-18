<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { Editor, EditorChange } from 'codemirror';
	import { createEditor } from './tei-editor';

	let editor: Editor;
	let changes = [] as EditorChange[];
	let changeTimeout: NodeJS.Timeout;
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
</script>

<div on:drag|preventDefault class="h-full">
	<input type="textarea" id="editor" />
</div>
