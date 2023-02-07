<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { DocumentImages } from '@prisma/client';
	import { Icon, X } from 'svelte-hero-icons';
	import { formHandler } from '$lib/forms';

	export let images: DocumentImages[];

	const documentId = parseInt($page.params.id);
	let form: HTMLFormElement;
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

		form.dispatchEvent(new SubmitEvent('submit'));
	}

	async function handleDragEnter(id: number, name: string) {
		swapImage2 = { id, name };
	}
</script>

<form
	action="/documents/{documentId}/images?/update"
	method="POST"
	use:enhance={formHandler()}
	bind:this={form}
>
	<input id="image1" name="image1" type="hidden" value={swapImage1.id} />
	<input id="image2" name="image2" type="hidden" value={swapImage2.id} />
</form>

<div class="grid grid-cols-12 gap-6 ">
	{#each images as image}
		<div class="col-span-6 md:col-span-3 xl:col-span-2 flex flex-col items-center">
			<a href="/images/{image.name}" target="_blank" rel="noreferrer">
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
				action="/documents/{documentId}/images/{image.id}?/destroy"
				method="POST"
				use:enhance={formHandler()}
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
