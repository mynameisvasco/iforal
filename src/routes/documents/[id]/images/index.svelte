<script lang="ts">
	import type { DocumentImages } from '@prisma/client';
	import { api } from '$lib/client/api';
	import DocumentImagesPositions from './_document-images-positions.svelte';
	import DocumentImagesEmpty from './_document-images-empty.svelte';
	import { page } from '$app/stores';

	const documentId = parseInt($page.params.id);
	export let data: DocumentImages[];

	async function handleImageOrderChange({ detail }: CustomEvent) {
		await api.put(window.fetch, `/documents/${documentId}/images`, detail);
	}
</script>

<svelte:head>
	<title>iForal - Editar imagens</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="title-1">Editar imagens</h1>
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		{#if data.length === 0}
			<DocumentImagesEmpty />
		{:else}
			<DocumentImagesPositions images={data} on:change={handleImageOrderChange} />
		{/if}
	</div>
</main>
