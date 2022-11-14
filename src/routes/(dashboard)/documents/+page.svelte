<script lang="ts">
	import { DocumentAdd, Icon, Plus } from 'svelte-hero-icons';
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import DocumentCard from '$lib/components/documents/document-card.svelte';
	import EmptyState from '$lib/components/empty-state.svelte';
	import type { PageData } from './$types';
	import type { Document, DocumentImages } from '@prisma/client';
	import { api } from '$lib/api';

	export let data: PageData;
	let searchText: string = '';
	let searchedDocuments: (Document & { images: DocumentImages[] })[] = [];

	async function handleSearch() {
		if (searchText.length > 3) {
			const response = await api.get<any[]>(window.fetch, `/documents/search?title=${searchText}`);
			searchedDocuments = response ?? [];
		}
	}
</script>

<svelte:head>
	<title>iForal - Documentos</title>
</svelte:head>

<PageHeader title="Documentos">
	<input
		type="text"
		class="input !w-96"
		placeholder="Procurar..."
		bind:value={searchText}
		on:keydown={handleSearch}
	/>
	<a class="btn btn-primary" href="/documents/create">
		<Icon class="w-5 mr-1" src={Plus} solid />
		Documento
	</a>
</PageHeader>
<PageBody>
	<div class="grid grid-cols-12 gap-6">
		{#if searchText}
			{#each searchedDocuments as document}
				<div class="col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-2">
					<DocumentCard {document} href="/documents/{document.id}" />
				</div>
			{:else}
				<div class="col-span-12">
					<EmptyState
						title="Não foram encontrados documentos"
						description="A pesquisa efetuada não encontrou quaisquer resultados"
						icon={DocumentAdd}
					/>
				</div>
			{/each}
		{:else}
			{#each data.documents as document}
				<div class="col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-2">
					<DocumentCard {document} href="/documents/{document.id}" />
				</div>
			{:else}
				<div class="col-span-12">
					<EmptyState
						title="Não existem documentos"
						description="Ainda não criou nem faz parte da edição de nenhum documento"
						icon={DocumentAdd}
					/>
				</div>
			{/each}
		{/if}
	</div>
</PageBody>
