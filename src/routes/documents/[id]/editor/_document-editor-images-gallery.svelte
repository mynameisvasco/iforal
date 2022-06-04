<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, ArrowRight, Icon } from 'svelte-hero-icons';
	import WZoom from 'vanilla-js-wheel-zoom';

	export let imagesUrls: string[] = [];
	let currentImageIndex = 0;

	function handleNextImage() {
		currentImageIndex = (currentImageIndex + 1) % imagesUrls.length;
	}

	function handlePreviousImage() {
		currentImageIndex = currentImageIndex - 1 >= 0 ? currentImageIndex - 1 : imagesUrls.length - 1;
	}

	onMount(() => {
		WZoom.create('#foral', {
			maxScale: 2.5,
			minScale: 1,
			dragScrollableOptions: {
				smoothExtinction: 0
			},
			disableWheelZoom: false,
			speed: 20
		});
	});
</script>

<div class="card !bg-black  h-full rounded-md bg-cover relative overflow-hidden flex items-center">
	<img
		id="foral"
		alt="foral"
		class="w-full cursor-zoom-in rounded-md"
		src="/api/storage/{imagesUrls[currentImageIndex]}"
	/>
	<div
		class="absolute bottom-0 p-3 flex items-center justify-between bg-stone-100/80 
		dark:bg-stone-900/80  w-full"
	>
		<span class="label">Imagem {currentImageIndex + 1} de {imagesUrls.length}</span>
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
