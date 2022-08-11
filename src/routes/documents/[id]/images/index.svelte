<script lang="ts">
	import type { DocumentImages } from '@prisma/client';
	import { api } from '$lib/client/api';
	import DocumentImagesPositions from './_document-images-positions.svelte';
	import DocumentImagesEmpty from './_document-images-empty.svelte';
	import { page } from '$app/stores';
	import { Icon, Upload } from 'svelte-hero-icons';
	import { enhance } from '$lib/client/forms';

	const documentId = parseInt($page.params.id);
	export let data: DocumentImages[];
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

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Editar imagens</h1>
			<div class="flex items-center gap-3">
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
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		{#if data.length === 0}
			<DocumentImagesEmpty />
		{:else}
			<DocumentImagesPositions images={data} on:change={handleImageOrderChange} />
		{/if}
	</div>
</main>
