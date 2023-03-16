<script lang="ts">
	import { DocumentAdd, Icon, Plus, Search } from 'svelte-hero-icons';
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import DocumentCard from '$lib/components/documents/document-card.svelte';
	import EmptyState from '$lib/components/empty-state.svelte';
	import type { PageData } from './$types';
	import DocumentsSearchSidecover from '$lib/components/documents/documents-search-sidecover.svelte';
	import DocumentListItem from '$lib/components/documents/document-list-item.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	let searchSidecover: any;
</script>

<svelte:head>
	<title>iForal - Documentos</title>
</svelte:head>

<DocumentsSearchSidecover bind:sideCover={searchSidecover} />

<PageHeader title="Documentos">
	<button class="btn btn-secondary" on:click={searchSidecover.toggle}>
		<Icon class="w-5 mr-1" src={Search} solid />
		Pesquisar
	</button>
	<a class="btn btn-primary" href="/documents/create">
		<Icon class="w-5 mr-1" src={Plus} solid />
		Documento
	</a>
</PageHeader>
<PageBody>
	<div class="grid grid-cols-12 gap-6">
		{#each data.documents as document}
			{#if $page.url.searchParams.get('query')}
				<div class="col-span-12 grid grid-cols-12 gap-6">
					<div class="col-span-12 md:col-span-3 lg:col-span-2">
						<DocumentCard {document} href="/documents/{document.id}" />
					</div>
					<div class="col-span-12 md:col-span-8 md:col-start-4">
						<DocumentListItem highlights={data.highlights[document.id]} />
					</div>
				</div>
			{:else}
				<div class="col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-2">
					<DocumentCard {document} href="/documents/{document.id}" />
				</div>
			{/if}
		{:else}
			<div class="col-span-12">
				<EmptyState
					title="Não existem documentos"
					description="Ainda não criou nem faz parte da edição de nenhum documento"
					icon={DocumentAdd}
				/>
			</div>
		{/each}
	</div>
</PageBody>
