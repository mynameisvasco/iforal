<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { EditorView } from '@codemirror/view';
	import { createTeiEditor, editorSettings } from '$stores/editor';
	import Gallery from '$lib/components/gallery.svelte';
	import EditorTagsMenu from './editor-tags-menu.svelte';
	import EditorSettingsMenu from './editor-settings-menu.svelte';
	import { enhance } from '$app/forms';
	import { formHandler } from '$lib/forms';
	import { page } from '$app/stores';

	let updateForm: HTMLFormElement;
	let editor = writable({} as EditorView);
	const isReadOnly =
		$page.data.document.user.id !== $page.data.user.id &&
		$page.data.document.permissions.filter(
			(p: any) => p.type === 0 && p.userId === $page.data.user.id
		).length !== 0;

	setContext('editor', editor);

	onMount(async () => {
		const editorElement = document.getElementById('editor') as HTMLElement;
		const viewerElement = document.getElementById('viewer') as HTMLElement;
		$editor = createTeiEditor(
			editorElement,
			viewerElement,
			updateForm,
			isReadOnly,
			$page.data.document.body,
			$page.data.tags
		);
	});
</script>

<form
	action="/documents/{$page.data.document.id}?/update"
	method="POST"
	use:enhance={formHandler()}
	bind:this={updateForm}
>
	<input name="changes" id="changes" type="hidden" />
</form>

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
			{#if $editorSettings.isViewerMode || isReadOnly}
				<div />
			{:else}
				<EditorTagsMenu tags={$page.data.tags} />
			{/if}
			<EditorSettingsMenu />
		</div>
		<div id="viewer" class:hidden={!$editorSettings.isViewerMode} />
		<div id="editor" class:hidden={$editorSettings.isViewerMode} />
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
