<script lang="ts">
	import { api } from '$lib/api';
	import { createEventDispatcher } from 'svelte';

	export let placeholder: string;
	export let searchParams: string[];
	export let endpoint: string;

	let value = '';
	let data = [] as any[];
	const dispatcher = createEventDispatcher();

	async function handleChange() {
		({ data } = await api.get(
			fetch,
			`${endpoint}?${searchParams.map((p) => `${p}=${value}`).join('&')}`
		));
	}
</script>

<div class="relative">
	<input type="text" class="input" {placeholder} bind:value on:change={handleChange} />

	{#if data.length !== 0}
		<div
			class="absolute flex flex-col w-full mx-auto margin-0 top-12 bg-white border border-stone-300 
		dark:border-stone-700 rounded-md"
		>
			{#each data as item}
				<div
					class="hover:bg-stone-200 p-3 cursor-pointer"
					on:click={() => dispatcher('selected', { item })}
				>
					<slot {item} />
				</div>
			{/each}
		</div>
	{/if}
</div>
