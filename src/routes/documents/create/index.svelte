<script lang="ts">
	import DocumentCreateFormSource from './_document-create-form-source.svelte';
	import DocumentCreateFormTitle from './_document-create-form-title.svelte';
	import DocumentCreateFormEncoding from './_document-create-form-encoding.svelte';
	import DocumentCreateFormPublication from './_document-create-form-publication.svelte';
	import { enhance, draft } from '$lib/forms';
	import type { Modal } from '$lib/components/stores/modals';
	import { browser } from '$app/env';

	const draftTitle = browser ? localStorage.getItem('document-create-title') : undefined;
	const draftModal: Modal = {
		id: 'document-draft',
		title: 'Rascunho guardado',
		description: `Existe um rascunho da última sessão com o título "${draftTitle}", deseja continuar o trabalho?`,
		actionName: 'Continuar',
		type: 'info'
	};
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
		<form
			id="document-create"
			action="/documents"
			method="post"
			use:enhance={{ redirect: '/documents' }}
			use:draft={draftModal}
		>
			<DocumentCreateFormTitle />
			<div class="py-8">
				<div class="border-t border-stone-300 dark:border-stone-700" />
			</div>
			<DocumentCreateFormPublication />
			<div class="py-8">
				<div class="border-t border-stone-300 dark:border-stone-700" />
			</div>
			<DocumentCreateFormSource />
			<div class="py-8">
				<div class="border-t border-stone-300 dark:border-stone-700" />
			</div>
			<DocumentCreateFormEncoding />
			<div class="py-8">
				<div class="border-t border-stone-300 dark:border-stone-700" />
			</div>
			<div class="flex justify-end gap-6">
				<button class="btn btn-primary" type="submit"> Guardar </button>
			</div>
		</form>
	</div>
</main>
