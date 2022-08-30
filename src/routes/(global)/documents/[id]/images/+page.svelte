<script lang="ts">
	import { api } from '$lib/api';
	import DocumentImagesPositions from './_document-images-positions.svelte';
	import DocumentImagesEmpty from './_document-images-empty.svelte';
	import { page } from '$app/stores';
	import { Icon, Upload } from 'svelte-hero-icons';
	import { enhance } from '$lib/forms';
	import type { PageData } from './$types';
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';

	export let data: PageData;

	const documentId = parseInt($page.params.id);
	let form: HTMLFormElement;
	let fileInput: HTMLInputElement;

	function handleImageUpload() {
		form.dispatchEvent(new SubmitEvent('submit'));
	}

	async function handleImageOrderChange({ detail }: CustomEvent) {
		await api.put(window.fetch, `/documents/${documentId}/images`, detail);
	}
</script>

<svelte:head>
	<title>iForal - Editar imagens</title>
</svelte:head>

<PageHeader title="Editar imagens">
	<form action="/documents/{documentId}/images" method="post" use:enhance bind:this={form}>
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
		<button class="btn btn-primary" on:click={() => fileInput.click()}>
			<Icon src={Upload} class="w-5 mr-1" solid />
			Imagem
		</button>
	</form>
</PageHeader>
<PageBody>
	{#if data.images.length === 0}
		<DocumentImagesEmpty />
	{:else}
		<DocumentImagesPositions images={data.images} on:change={handleImageOrderChange} />
	{/if}
</PageBody>
