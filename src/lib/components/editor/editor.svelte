<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { EditorView } from '@codemirror/view';
	import { createTeiEditor, editorSettings } from '$stores/editor';
	import { page } from '$app/stores';
	import Gallery from '$lib/components/gallery.svelte';
	import EditorTagsMenu from './editor-tags-menu.svelte';
	import EditorSettingsMenu from './editor-settings-menu.svelte';
	import type { Tag } from '@prisma/client';

	export let documentId: number;
	export let body: string;
	export let tags: Tag[];

	let editor = writable({} as EditorView);
	setContext('editor', editor);

	onMount(async () => {
		const element = document.getElementById('editor') as HTMLElement;
		$editor = createTeiEditor(element, documentId, body, tags);
	});
</script>

<div class="grid grid-cols-12 gap-6">
	<div
		class="h-full"
		class:col-span-12={$editorSettings.isFullWidth}
		class:col-span-8={!$editorSettings.isFullWidth}
	>
		<div
			class="flex items-center justify-between gap-1 w-full bg-stone-50 dark:bg-stone-900 p-1 
		rounded-t-md border border-stone-300 dark:border-stone-700 h-12"
		>
			<EditorTagsMenu {tags} />
			<EditorSettingsMenu />
		</div>
		<div id="editor" />
	</div>

	<div
		class="h-full"
		class:col-span-4={!$editorSettings.isFullWidth}
		class:hidden={$editorSettings.isFullWidth}
		style="min-height: 800px;"
	>
		<Gallery images={$page.data.document.images} />
	</div>
</div>
