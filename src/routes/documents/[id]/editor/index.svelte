<script context="module" lang="ts">
	export async function load(context: LoadInput) {
		const id = parseInt(context.params.id);
		const { data: document } = await api.get(context.fetch, `/api/documents/${id}`);
		const { data: users } = await api.get(context.fetch, `/api/documents/${id}/users`);

		return {
			props: {
				document,
				users
			}
		};
	}
</script>

<script lang="ts">
	import type { LoadInput } from '@sveltejs/kit';
	import TeiEditor from '$lib/components/tei-editor/tei-editor.svelte';
	import { editorSettings } from '$lib/stores/editor-settings';
	import DocumentEditorActions from './_document-editor-actions.svelte';
	import { api } from '$lib/util/api';
	import type { Document, DocumentImages, User } from '@prisma/client';
	import { setContext } from 'svelte';
	import DocumentEditorImagesGallery from './_document-editor-images-gallery.svelte';

	export let document: Document & { images: DocumentImages[] };
	export let users: User;
	setContext('document', document);
	setContext('users', users);

	async function handleChange({ detail }: CustomEvent) {
		await api.put(fetch, `/api/documents/${document.id}`, detail);
	}
</script>

<svelte:head>
	<title>iForal - Editor</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">{document.title}</h1>
			<DocumentEditorActions />
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-{$editorSettings.editorColSize} h-full">
				<TeiEditor on:change={handleChange} />
			</div>
			{#if 12 - $editorSettings.editorColSize != 0}
				<div class="col-span-{12 - ($editorSettings.editorColSize % 12)} h-full">
					<DocumentEditorImagesGallery imagesUrls={document.images.map((i) => i.name)} />
				</div>
			{/if}
		</div>
	</div>
</main>
