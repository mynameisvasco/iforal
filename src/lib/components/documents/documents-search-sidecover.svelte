<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import SideCover from '$lib/components/side-cover.svelte';

	export let sideCover: any;

	async function handleSearch(event: any) {
		const value = event.target.value;
		const url = new URL($page.url);

		if (value.length === 0) {
			url.searchParams.delete(event.target.name);
		} else {
			url.searchParams.set(event.target.name, value);
		}

		await goto(url.href);
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
				on:change={handleSearch}
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
				on:change={handleSearch}
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
				on:change={handleSearch}
			/>
		</div>
		<div class="col-span-12 mt-6 mb-3 border-b border-stone-300 dark:border-stone-700" />
		<div class="col-span-12 flex flex-col gap-1">
			<label for="query" class="label">Query</label>
			<input
				type="text"
				class="input"
				placeholder="test"
				name="query"
				value={$page.url.searchParams.get('query')}
				on:change={handleSearch}
			/>
		</div>
		<div class="col-span-12 flex flex-col gap-1">
			<label for="query" class="label">Capitalização sensível</label>
			<input
				type="checkbox"
				name="isCaseSensitive"
				class="bg-white dark:bg-stone-800 rounded-md p-2 border-stone-300 dark:border-stone-700"
				value={$page.url.searchParams.get('query')}
				on:change={handleSearch}
			/>
		</div>
		<div class="col-span-12 flex flex-col gap-1">
			<label for="contextSize" class="label">Tamanho do Contexto</label>
			<input
				type="number"
				class="input"
				placeholder="10"
				min={1}
				name="contextSize"
				value={$page.url.searchParams.get('contextSize') ?? 10}
				on:change={handleSearch}
			/>
		</div>
	</div>
</SideCover>
