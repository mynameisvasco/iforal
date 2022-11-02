<script lang="ts">
	import type { Document } from '@prisma/client';
	import { format as formatDate } from 'date-fns';
	import pt from 'date-fns/locale/pt';
	import { onMount } from 'svelte';
	import SearchEndpointInput from '../search-endpoint-input.svelte';
	//@ts-ignore
	import CETEIcean from 'CETEIcean';
	import { EditorUtils } from '$lib/util';

	let document: Document;

	function handleSelectDocument(d: Document) {
		document = d;
		setTimeout(() => {
			var reader = new CETEIcean();
			reader.addBehaviors(EditorUtils.getTEIBehavior());
			reader.makeHTML5(EditorUtils.addTeiBeginTag(document.body), (data: any) => {
				window.document.getElementById(`viewer-${document.id}`)!.appendChild(data);
			});
		});
	}
</script>

<div
	class="flex flex-col bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-300 h-full p-10 gap-3"
>
	{#if !document}
		<div class="w-full mb-12">
			<SearchEndpointInput
				endpoint="/viewer/search"
				searchParams={['title']}
				placeholder="Título da obra"
				let:item
			>
				<button
					type="button"
					class="flex items-center gap-3 w-full"
					on:click={() => handleSelectDocument(item)}
				>
					<img src="/images/{item.images.at(0)?.name}" alt="capa do foral" class="w-12" />
					<span class="flex flex-col items-start">
						<span class="text-stone-900 dark:text-white text-sm font-medium">
							{item.title}
						</span>
						<span class="text-stone-500 dark:text-stone-400 text-sm">
							{formatDate(new Date(item.createdAt), 'dd MMMM, HH:mm', { locale: pt })}
						</span>
					</span>
				</button>
			</SearchEndpointInput>
		</div>
	{:else}
		<h1 class="title-1">{document.title}</h1>
		<div class="bg-white dark:bg-stone-800 h-full w-full rounded-md">
			<div id="viewer-{document.id}" class="p-4" />
		</div>
	{/if}
</div>
