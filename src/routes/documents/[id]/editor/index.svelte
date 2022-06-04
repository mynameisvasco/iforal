<script context="module" lang="ts">
	export async function load(context: LoadInput) {
		const id = parseInt(context.params.id);
		const { data: document } = await api.get(context.fetch, `/api/documents/${id}`);

		return {
			props: {
				document
			}
		};
	}
</script>

<script lang="ts">
	import type { LoadInput } from '@sveltejs/kit';
	import TeiEditor from '$lib/components/tei-editor/tei-editor.svelte';
	import { editorSettings } from '$lib/stores/editor-settings';
	import DocumentEditorActions from './_document-editor-actions.svelte';
	import DocumentEditorImagesCount from './_document-editor-images-count.svelte';
	import DocumentEditorSetttings from './_document-editor-setttings.svelte';
	import { api } from '$lib/util/api';
	import type { Document } from '@prisma/client';
	import { setContext } from 'svelte';
	import DocumentEditorImagesGallery from './_document-editor-images-gallery.svelte';

	export let document: Document;
	setContext('document', document);
</script>

<svelte:head>
	<title>iForal - Editor"</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">{document.title}</h1>
			<div class="flex gap-3 items-center">
				{#if 12 - $editorSettings.editorColSize === 0}
					<DocumentEditorImagesCount />
				{/if}
				<DocumentEditorActions />
				<DocumentEditorSetttings />
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-{$editorSettings.editorColSize} h-full">
				<TeiEditor />
			</div>
			{#if 12 - $editorSettings.editorColSize != 0}
				<div class="col-span-{12 - ($editorSettings.editorColSize % 12)} h-full">
					<DocumentEditorImagesGallery imagesUrls={document.images.map((i) => i.name)} />
				</div>
			{/if}
		</div>
	</div>
</main>
