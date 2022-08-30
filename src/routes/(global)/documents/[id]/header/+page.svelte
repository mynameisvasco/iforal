<script lang="ts">
	import PageBody from '$lib/components/page-body.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import { enhance } from '$lib/forms';
	import { Icon, Save } from 'svelte-hero-icons';
	import DocumentHeaderEditFormEncoding from './_document-header-edit-form-encoding.svelte';
	import DocumentHeaderEditFormPublication from './_document-header-edit-form-publication.svelte';
	import DocumentHeaderEditFormSource from './_document-header-edit-form-source.svelte';
	import DocumentHeaderEditFormTitle from './_document-header-edit-form-title.svelte';
</script>

<svelte:head>
	<title>iForal - Editar cabeçalho</title>
</svelte:head>

<PageHeader title="Editar cabeçalho" />

<PageBody>
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
</PageBody>
