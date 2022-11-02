<script lang="ts">
	import PageBody from '$lib/components/page-body.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import { enhance } from '$app/forms';
	import { Icon, Save } from 'svelte-hero-icons';
	import DocumentHeaderEditFormEncoding from './_document-header-edit-form-encoding.svelte';
	import DocumentHeaderEditFormPublication from './_document-header-edit-form-publication.svelte';
	import DocumentHeaderEditFormSource from './_document-header-edit-form-source.svelte';
	import DocumentHeaderEditFormTitle from './_document-header-edit-form-title.svelte';
	import { formHandler } from '$lib/forms';
	import type { Notification } from '$stores/notifications';
	import { page } from '$app/stores';

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
	<form
		action="/documents/{$page.data.document.id}/header?/update"
		method="POST"
		use:enhance={formHandler(updateSuccessNotification)}
	>
		<DocumentHeaderEditFormTitle />
		<div class="py-8">
			<div class="border-t border-stone-300 dark:border-stone-700" />
		</div>
		<DocumentHeaderEditFormPublication />
		<div class="py-8">
			<div class="border-t border-stone-300 dark:border-stone-700" />
		</div>
		<DocumentHeaderEditFormSource />
		<div class="py-8">
			<div class="border-t border-stone-300 dark:border-stone-700" />
		</div>
		<DocumentHeaderEditFormEncoding />
		<div class="py-8">
			<div class="border-t border-stone-300 dark:border-stone-700" />
		</div>
		<div class="flex justify-end gap-6">
			<button class="btn btn-primary" type="submit">
				<Icon src={Save} solid class="w-5 mr-1" />Guardar
			</button>
		</div>
	</form>
</PageBody>
