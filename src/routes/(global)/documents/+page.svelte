<script lang="ts">
	import { DocumentAdd, Icon, Plus } from 'svelte-hero-icons';
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import DocumentCard from '$lib/components/documents/document-card.svelte';
	import EmptyState from '$lib/components/empty-state.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>iForal - Documentos recentes</title>
</svelte:head>

<PageHeader title="Documentos Recentes">
	<a class="btn btn-primary" href="/documents/create">
		<Icon class="w-5 mr-1" src={Plus} solid />
		Documento
	</a>
</PageHeader>
<PageBody>
	<div class="grid grid-cols-12 gap-6">
		{#each data.documents as document}
			<div class="col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-2">
				<DocumentCard {document} />
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
	</div>
</PageBody>
