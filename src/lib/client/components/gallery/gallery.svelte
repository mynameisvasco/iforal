<script lang="ts">
	import type { DocumentImages } from '@prisma/client';
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight, Icon } from 'svelte-hero-icons';
	import WZoom from 'vanilla-js-wheel-zoom';

	export let images: DocumentImages[] = [];
	let currentImageIndex = 0;

	function handleNextImage() {
		currentImageIndex = (currentImageIndex + 1) % images.length;
	}

	function handlePreviousImage() {
		currentImageIndex = currentImageIndex - 1 >= 0 ? currentImageIndex - 1 : images.length - 1;
	}

	onMount(() => {
		WZoom.create('#foral', {
			maxScale: 2.5,
			minScale: 1,
			dragScrollableOptions: {
				smoothExtinction: 0
			},
			smoothExtinction: 0.1,
			disableWheelZoom: false,
			speed: 2
		});
	});
</script>

<div
	class="card !bg-black h-full rounded-md bg-cover relative overflow-hidden flex items-center"
	style="height: 750px;"
>
	{#if images[currentImageIndex]}
		<img
			id="foral"
			alt="foral"
			class="w-full cursor-zoom-in rounded-md"
			src="/api/storage/{images[currentImageIndex].name}"
		/>
	{:else}
		<div class="flex items-center justify-center w-full">
			<p class="text-white">Ainda não foi carregada nenhuma imagem</p>
		</div>
	{/if}
	<div
		class="absolute bottom-0 p-3 flex items-center justify-between bg-stone-100/75 
		dark:bg-stone-900/75 w-full filter backdrop-blur-sm"
	>
		<span class="text-stone-900 dark:text-white text-sm"
			>Imagem {currentImageIndex + 1} de {images.length}</span
		>
		<div class="flex items-center gap-3">
			<button class="text-stone-900 dark:text-white" on:click={handlePreviousImage}>
				<Icon src={ArrowLeft} class="w-5" />
			</button>
			<button class="text-stone-900 dark:text-white" on:click={handleNextImage}>
				<Icon src={ArrowRight} class="w-5" />
			</button>
		</div>
	</div>
</div>
