<script lang="ts">
	import { CloudUpload, Icon } from 'svelte-hero-icons';
	//@ts-ignore
	import Dropzone from 'svelte-file-dropzone';

	export let files: File[] = [];
	let thumbnailsUrl: string[] = [];

	async function handleFilesSelect(e: CustomEvent) {
		files = [...files, ...e.detail.acceptedFiles];

		await new Promise((resolve) => {
			for (const image of e.detail.acceptedFiles) {
				thumbnailsUrl = [...thumbnailsUrl, URL.createObjectURL(image)];
			}

			resolve(null);
		});
	}
</script>

<Dropzone
	on:drop={handleFilesSelect}
	disableDefaultStyles
	multiple
	accept={['image/png', 'image/jpeg', 'image/bmp']}
>
	<div
		class="border-2 border-dashed border-stone-300 dark:border-stone-700 h-64 grid grid-cols-12
     relative gap-6 p-8 overflow-y-auto overflow-x-hidden transition-all hover:border-gray-900 
		 dark:hover:border-orange-300 cursor-pointer rounded-md"
	>
		{#each thumbnailsUrl as url}
			<div class="col-span-2 z-20">
				<img src={url} class="object-cover w-full h-32 rounded-md" alt="upload" />
			</div>
		{/each}
		{#if files.length === 0}
			<div
				class="absolute mx-auto my-auto left-0 right-0 top-0 bottom-0 flex items-center justify-center
      text-stone-400 dark:text-stone-600 hover:text-gray-900 dark:hover:text-orange-300 
      transition-all"
			>
				<div>
					<Icon src={CloudUpload} solid class="w-14" />
				</div>
				<h2 class="text-xl">Carregar ficheiros</h2>
			</div>
		{/if}
	</div>
</Dropzone>
