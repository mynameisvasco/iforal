<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$lib/forms';
	import type { DocumentImages } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import { Icon, X } from 'svelte-hero-icons';

	export let images: DocumentImages[];

	const documentId = parseInt($page.params.id);
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
		<div class="col-span-6 md:col-span-3 xl:col-span-2 flex flex-col items-center">
			<a href="/images/{image.name}" target="_blank">
				<img
					class="cursor-pointer border border-stone-300 dark:border-stone-700 shadow rounded-md
					mb-1"
					src="/images/{image.name}"
					alt={image.name}
					on:dragstart={() => handleDragStart(image.id, image.name)}
					on:dragend={handleDragEnd}
					on:dragenter={() => handleDragEnter(image.id, image.name)}
				/>
			</a>
			<form
				action="/documents/{documentId}/images/{image.id}?_method=delete"
				method="post"
				use:enhance
			>
				<div class="flex items-center mt-1">
					<span class="label">Imagem {image.position + 1}</span>
					<button type="submit">
						<Icon src={X} class="w-4 label ml-2" />
					</button>
				</div>
			</form>
		</div>
	{/each}
</div>
