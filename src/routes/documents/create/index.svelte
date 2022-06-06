<script lang="ts">
	import { goto } from '$app/navigation';
	import { api } from '$lib/util/api';
	import DocumentCreateForm from './_document-create-form.svelte';

	async function handleDocumentCreate({ detail }: CustomEvent) {
		const { status } = await api.post(fetch, '/api/documents', detail);

		if (status === 200) {
			await goto('/documents');
		}
	}
</script>

<svelte:head>
	<title>iForal - Novo documento</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Novo Documento</h1>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<DocumentCreateForm on:create={handleDocumentCreate} />
	</div>
</main>
