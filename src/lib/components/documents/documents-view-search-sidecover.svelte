<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SideCover from '$lib/components/side-cover.svelte';
	import type { Document } from '@prisma/client';
	import { format as formatDate } from 'date-fns';
	import { createEventDispatcher } from 'svelte';
	import { Icon, DocumentSearch, Plus } from 'svelte-hero-icons';

	let sideCover: any;
	const dispatcher = createEventDispatcher();

	async function handleSearch(event: any) {
		const value = event.target.value;

		if (value.length === 0) {
			$page.url.searchParams.delete(event.target.name);
		} else {
			$page.url.searchParams.set(event.target.name, value);
		}

		await goto($page.url.href);
	}

	function handleSelectDocument(document: Document) {
		dispatcher('select', { documentId: document.id });
	}
</script>

<SideCover
	title="Pesquisar"
	description="Pesquise por determinados documentos, especificando o título e o interval de datas."
	bind:this={sideCover}
>
	<div class="grid grid-cols-12 gap-3 pb-12">
		<div class="col-span-12 flex flex-col gap-1">
			<label for="title" class="label">Título da Obra</label>
			<input
				type="text"
				class="input"
				placeholder="Foral de ..."
				name="title"
				value={$page.url.searchParams.get('title')}
				on:blur={handleSearch}
			/>
		</div>
		<div class="col-span-12 lg:col-span-6 flex flex-col gap-1">
			<label for="from" class="label">De</label>
			<input
				type="number"
				class="input"
				placeholder="1700"
				name="from"
				value={$page.url.searchParams.get('from')}
				on:blur={handleSearch}
			/>
		</div>
		<div class="col-span-12 lg:col-span-6 flex flex-col gap-1">
			<label for="to" class="label">Até</label>
			<input
				type="number"
				class="input"
				placeholder="1720"
				name="to"
				value={$page.url.searchParams.get('to')}
				on:blur={handleSearch}
			/>
		</div>
		<div class="col-span-12 mt-6 mb-3 border-b border-stone-300 dark:border-stone-700" />
		{#each $page.data.documentsToCompare as document}
			<div class="col-span-12 flex items-center justify-between">
				<span class="text-stone-900 dark:text-stone-300">
					{document.title}
				</span>
				<span class="text-stone-500 dark:text-stone-400 text-sm">
					{formatDate(new Date(document.header.originDate), 'MMMM yyyy')}
				</span>
				<button
					class="text-stone-500 dark:text-stone-400 text-sm"
					on:click={() => handleSelectDocument(document)}
				>
					<Icon src={Plus} class="w-5" />
				</button>
			</div>
		{/each}
	</div>
</SideCover>
<button type="button" class="btn btn-secondary" on:click={sideCover.toggle}>
	<Icon src={DocumentSearch} solid class="w-5 mr-1" />
	Comparar
</button>
