<script context="module" lang="ts">
	import type { LoadInput } from '@sveltejs/kit';

	export async function load(context: LoadInput) {
		const id = parseInt(context.params.id);
		const { data: images } = await api.get(context.fetch, `/api/documents/${id}/images`);

		return {
			props: {
				id,
				images
			}
		};
	}
</script>

<script lang="ts">
	import type { DocumentImages } from '@prisma/client';
	import { api } from '$lib/util/api';
	import DocumentImagesPositions from './_document-images-positions.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let id: number;
	export let images: DocumentImages;

	setContext('images', writable(images));

	async function handleImageOrderChange({ detail }: CustomEvent) {
		await api.put(window.fetch, `/api/documents/${id}/images`, detail);
	}
</script>

<svelte:head>
	<title>iForal - Imagens</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="title-1">Editar imagens</h1>
				<p class="mt-1 label">
					Possibilita carregar novas imagens e ordenar as existentes através do mecanismo de clicar
					e arrastar na imagem.
				</p>
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<DocumentImagesPositions on:change={handleImageOrderChange} />
	</div>
</main>
