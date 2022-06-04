<script context="module" lang="ts">
	export async function load(context: LoadInput) {
		const { data: documents } = await api.get(context.fetch, '/api/documents');

		return {
			props: { documents }
		};
	}
</script>

<script lang="ts">
	import { DocumentAdd, Icon, Plus } from 'svelte-hero-icons';
	import EmptyState from '$lib/components/empty-state/empty-state.svelte';
	import IndexDocumentCard from './_index-document-card.svelte';
	import IndexDocumentNew from './_index-document-new.svelte';
	import type { LoadInput } from '@sveltejs/kit';
	import { api } from '$lib/util/api';

	export let documents: any[] = [];

	async function handleDelete({ detail }: CustomEvent) {
		await api.delete(fetch, `/api/documents/${detail.id}`);
		documents = documents.filter((d) => d.id !== detail.id);
	}
</script>

<svelte:head>
	<title>iForal - Documentos recentes</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Documentos Recentes</h1>
		</div>
	</div>
</header>
<main>
	<div class="page-body h-full">
		<div class="grid grid-cols-12 gap-6">
			{#if documents.length !== 0}
				<div class="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
					<IndexDocumentNew />
				</div>
				{#each documents as document}
					<div class="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
						<IndexDocumentCard {document} on:delete={handleDelete} />
					</div>
				{/each}
			{:else}
				<div class="col-span-12">
					<EmptyState
						title="Não existem documentos"
						description="Ainda não criou nem faz parte da edição de nenhum documento"
						icon={DocumentAdd}
					>
						<a href="/documents/create" class="btn btn-primary">
							<Icon src={Plus} class="w-5 mr-1" solid />
							Documento
						</a>
					</EmptyState>
				</div>
			{/if}
		</div>
	</div>
</main>
