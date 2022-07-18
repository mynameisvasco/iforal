<script lang="ts">
	import type { DocumentImages } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';

	export let images: DocumentImages[];

	const dispatcher = createEventDispatcher();
	let swapImage1 = { id: 0, name: '' };
	let swapImage2 = { id: 0, name: '' };

	async function handleDragStart(id: number, name: string) {
		swapImage1 = { id, name };
	}

	async function handleDragEnd() {
		images = [
			...images.map((i) => {
				if (i.id === swapImage1.id) {
					return { ...i, name: swapImage2.name };
				} else if (i.id === swapImage2.id) {
					return { ...i, name: swapImage1.name };
				}
				return i;
			})
		];

		dispatcher('change', { image1: swapImage1.id, image2: swapImage2.id });
	}

	async function handleDragEnter(id: number, name: string) {
		swapImage2 = { id, name };
	}
</script>

<div class="grid grid-cols-12 gap-6 ">
	{#each images as image}
		<div class="col-span-6 lg:col-span-4 xl:col-span-3 flex flex-col items-center">
			<a href="/api/storage/{image.name}" target="_blank">
				<img
					class="cursor-pointer border border-stone-300 dark:border-stone-700 shadow rounded-md
					mb-1"
					src="/api/storage/{image.name}"
					alt={image.name}
					on:dragstart={() => handleDragStart(image.id, image.name)}
					on:dragend={handleDragEnd}
					on:dragenter={() => handleDragEnter(image.id, image.name)}
				/>
			</a>
			<span class="label">Imagem {image.position + 1}</span>
		</div>
	{/each}
</div>
