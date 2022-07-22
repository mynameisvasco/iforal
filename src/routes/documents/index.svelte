<script lang="ts">
	import IndexDocumentsCard from './_documents-index-card.svelte';
	import IndexDocumentsNew from './_documents-index-new.svelte';
	import IndexDocumentsEmpty from './_documents-index-empty.svelte';
	import type { Document, DocumentImages } from '@prisma/client';

	export let data: (Document & { images: DocumentImages[] })[];
	export let error: any = {};

	$: documents = data;
</script>

<svelte:head>
	<title>iForal - Documentos recentes</title>
</svelte:head>

<header>
	<div class="page-header">
		<h1 class="title-1">Documentos Recentes</h1>
	</div>
</header>
<main>
	<div class="page-body h-full">
		<div class="grid grid-cols-12 gap-6">
			{#if documents.length !== 0}
				<div class="col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
					<IndexDocumentsNew />
				</div>
				{#each documents as document}
					<div class="col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
						<IndexDocumentsCard {document} />
					</div>
				{/each}
			{:else}
				<div class="col-span-12">
					<IndexDocumentsEmpty />
				</div>
			{/if}
		</div>
	</div>
</main>
