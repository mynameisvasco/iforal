<script lang="ts">
	import DocumentImagesPositions from './_document-images-positions.svelte';
	import { page } from '$app/stores';
	import { Icon, Photograph, Upload } from 'svelte-hero-icons';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import EmptyState from '$lib/components/empty-state.svelte';
	import { formHandler } from '$lib/forms';

	export let data: PageData;

	const documentId = parseInt($page.params.id);
	let form: HTMLFormElement;
	let fileInput: HTMLInputElement;

	function handleImageUpload() {
		form.dispatchEvent(new SubmitEvent('submit'));
	}
</script>

<svelte:head>
	<title>iForal - Editar imagens</title>
</svelte:head>

<PageHeader title="Editar imagens">
	<form
		action="/documents/{documentId}/images?/create"
		method="POST"
		use:enhance={formHandler()}
		bind:this={form}
	>
		<input
			id="images"
			name="images"
			class="hidden"
			type="file"
			accept=".jpg, .jpeg, .png, .bmp"
			multiple
			on:change={handleImageUpload}
			bind:this={fileInput}
		/>
		<button type="button" class="btn btn-primary" on:click={() => fileInput.click()}>
			<Icon src={Upload} class="w-5 mr-1" solid />
			Imagem
		</button>
	</form>
</PageHeader>
<PageBody>
	{#if data.images.length === 0}
		<EmptyState
			title="Não existem imagens"
			description="Ainda não foram carregadas imagens neste documento"
			icon={Photograph}
		/>
	{:else}
		<DocumentImagesPositions images={data.images} />
	{/if}
</PageBody>
