<script lang="ts">
	import type { Document } from '@prisma/client';
	import { DocumentSearch, Icon, Plus, X, Photograph } from 'svelte-hero-icons';
	import { createTeiViewer, viewerSettings } from '$stores/viewer';
	import { onMount } from 'svelte';
	import { api } from '$lib/api';
	import EmptyState from '../empty-state.svelte';
	import DocumentViewerForm from './document-viewer-form.svelte';
	import Gallery from '../gallery.svelte';

	export let viewerIndex: number;

	let document: Document;

	function handleAddDocument() {
		viewerSettings.increaseViewersCount();
	}

	function handleRemoveDocument() {
		viewerSettings.decreaseViewersCount();
		viewerSettings.setDocumentId(viewerIndex, null);
	}

	function handleSelectDocument(d: Document) {
		document = d;
		viewerSettings.setDocumentId(viewerIndex, document.id);
		setTimeout(() =>
			createTeiViewer(document, window.document.getElementById(`viewer-${viewerIndex}`)!)
		);
	}

	onMount(async () => {
		const documentId = $viewerSettings.viewingDocumentIds[viewerIndex];
		if (documentId) {
			const data = (await api.get<any[]>(window.fetch, `/viewer/search?id=${documentId}`)) as any;
			document = data[0];
			setTimeout(() =>
				createTeiViewer(document, window.document.getElementById(`viewer-${viewerIndex}`)!)
			);
		}
	});
</script>

<div
	class="flex flex-col bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-300 
	h-full p-8 gap-3 relative"
>
	{#if viewerIndex === $viewerSettings.viewersCount && $viewerSettings.viewersCount < 3}
		<button
			class="absolute ml-32 w-12 h-12 bg-stone-900 dark:bg-orange-300 rounded-sm right-0 bottom-[50%]
	 flex items-center justify-center text-white dark:text-stone-900 cursor-pointer"
			on:click={handleAddDocument}
		>
			<Icon src={Plus} class="w-8" solid />
		</button>
	{/if}
	<div class="flex gap-6 items-start">
		{#if !document}
			<DocumentViewerForm />
		{/if}

		{#if viewerIndex !== 1}
			<button class="text-stone-700 dark:text-stone-300 mt-2" on:click={handleRemoveDocument}>
				<Icon src={X} class="w-5" solid />
			</button>
		{/if}
	</div>
	{#if document}
		<div class="flex items-center justify-between">
			<h1 class="title-1 mb-2">{document.title}</h1>
			<div>
				<button class="text-stone-700 dark:text-stone-300 mt-2">
					<Icon src={Photograph} class="w-5" solid />
				</button>
				{#if viewerIndex === $viewerSettings.viewersCount && $viewerSettings.viewersCount < 3}
					<button class="text-stone-700 dark:text-stone-300 mt-2" on:click={handleAddDocument}>
						<Icon src={Plus} class="w-5 mr-1" solid />
					</button>
				{/if}
				{#if viewerIndex !== 1}
					<button class="text-stone-700 dark:text-stone-300 mt-2" on:click={handleRemoveDocument}>
						<Icon src={X} class="w-5" solid />
					</button>
				{/if}
			</div>
		</div>
		<div class="bg-white dark:bg-stone-800 h-full w-full rounded-md overflow-y-auto">
			<div id="viewer-{viewerIndex}" class="p-4 overflow-y-auto" />
		</div>
	{:else}
		<EmptyState
			title="Nenhum documento carregado"
			icon={DocumentSearch}
			description="Carregue um documento pesquisando na entrada a cima"
		/>
	{/if}
</div>
