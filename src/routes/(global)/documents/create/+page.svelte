<script lang="ts">
	import DocumentCreateFormSource from './_document-create-form-source.svelte';
	import DocumentCreateFormTitle from './_document-create-form-title.svelte';
	import DocumentCreateFormEncoding from './_document-create-form-encoding.svelte';
	import DocumentCreateFormPublication from './_document-create-form-publication.svelte';
	import { enhance, draft } from '$lib/client/forms';
	import type { Modal } from '$lib/client/modals';
	import { browser } from '$app/environment';
	import { Icon, Save } from 'svelte-hero-icons';

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

<main>
	<div class="page-body mt-12">
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
				<button class="btn btn-primary" type="submit">
					<Icon src={Save} solid class="w-5 mr-1" />Guardar
				</button>
			</div>
		</form>
	</div>
</main>
