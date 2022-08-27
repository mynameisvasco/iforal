<script lang="ts">
	import IndexDocumentsCard from './_documents-index-card.svelte';
	import IndexDocumentsEmpty from './_documents-index-empty.svelte';
	import type { PageData } from './$types';
	import { Icon, Plus } from 'svelte-hero-icons';

	export let data: PageData;
</script>

<svelte:head>
	<title>iForal - Documentos recentes</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Documentos Recentes</h1>
			<div class="flex items-center">
				<a class="btn btn-primary" href="/documents/create" sveltekit:prefetch>
					<Icon class="w-5 mr-1" src={Plus} solid />
					Documento
				</a>
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body h-full">
		<div class="grid grid-cols-12 gap-6">
			{#each data.documents as document}
				<div class="col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-2">
					<IndexDocumentsCard {document} />
				</div>
			{:else}
				<div class="col-span-12">
					<IndexDocumentsEmpty />
				</div>
			{/each}
		</div>
	</div>
</main>
