<script lang="ts">
	import { enhance } from '$lib/client/forms';
	import { Icon, Save } from 'svelte-hero-icons';
	import type { PageData } from '../../../../../../.svelte-kit/types/src/routes/documents/[id]/header/$types';
	import DocumentHeaderEditFormEncoding from './_document-header-edit-form-encoding.svelte';
	import DocumentHeaderEditFormPublication from './_document-header-edit-form-publication.svelte';
	import DocumentHeaderEditFormSource from './_document-header-edit-form-source.svelte';
	import DocumentHeaderEditFormTitle from './_document-header-edit-form-title.svelte';
</script>

<svelte:head>
	<title>iForal - Editar cabeçalho</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Editar Cabeçalho</h1>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<form id="document-create" action="/documents" method="post" use:enhance>
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
	</div>
</main>
