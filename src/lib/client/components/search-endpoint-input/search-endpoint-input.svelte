<script lang="ts">
	import { api } from '$lib/client/api';
	import { createEventDispatcher } from 'svelte';

	export let placeholder: string;
	export let searchParams: string[];
	export let endpoint: string;

	let value = '';
	let data = [] as any[];
	const dispatcher = createEventDispatcher();

	async function handleChange() {
		const response = await api.get(
			fetch,
			`${endpoint}?${searchParams.map((p) => `${p}=${value}`).join('&')}`
		);

		data = (response.data as any[]) ?? [];
	}

	function handleSelected(item: any) {
		dispatcher('selected', { item });
		value = '';
		data = [];
	}
</script>

<div class="relative">
	<input
		type="text"
		class="input"
		{placeholder}
		bind:value
		on:input={handleChange}
		autocomplete="disabled"
	/>
	{#if value !== ''}
		<div class="dropdown-menu !w-full">
			{#each data as item}
				<div class="dropdown-menu-item" on:click={() => handleSelected(item)}>
					<slot {item} />
				</div>
			{:else}
				<div class="dropdown-menu-item">
					<span class="text-stone-900 dark:text-white text-sm p-3">
						Não foi encontrado nenhum utilizador
					</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
