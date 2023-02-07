<script lang="ts">
	import PageBody from '$lib/components/page-body.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import { enhance } from '$app/forms';
	import { Icon, Save } from 'svelte-hero-icons';
	import { formHandler } from '$lib/forms';
	import type { Notification } from '$stores/notifications';
	import { page } from '$app/stores';
	import DocumentEditForm from '$lib/components/documents/document-edit-form.svelte';

	const updateSuccessNotification: Notification = {
		title: 'Alterações efetuadas',
		message: 'O cabeçalho foi atualizado',
		type: 'success'
	};
</script>

<svelte:head>
	<title>iForal - Editar cabeçalho</title>
</svelte:head>

<PageHeader title="Editar cabeçalho" />

<PageBody>
	<DocumentEditForm />
</PageBody>
