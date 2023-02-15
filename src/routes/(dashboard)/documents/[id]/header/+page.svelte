<script lang="ts">
	import PageBody from '$lib/components/page-body.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import DocumentEditForm from '$lib/components/documents/document-edit-form.svelte';
</script>

<svelte:head>
	<title>iForal - Editar cabeçalho</title>
</svelte:head>

<PageHeader title="Editar cabeçalho" />

<PageBody>
	<DocumentEditForm />
</PageBody>
