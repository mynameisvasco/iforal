<script lang="ts">
	import { api } from '$lib/client/api';

	export let placeholder: string;
	export let searchParams: string[];
	export let endpoint: string;

	let value = '';
	let data = [] as any[];

	async function handleChange() {
		data = (await api.get<any[]>(
			fetch,
			`${endpoint}?${searchParams.map((p) => `${p}=${value}`).join('&')}`
		)) as any;
	}

	function handleClick() {
		value = '';
		data = [];
	}
</script>

<div class="relative">
	<input
		type="text"
		class="input"
		name="search"
		{placeholder}
		bind:value
		on:input={handleChange}
		autocomplete="off"
		list="autocompleteOff"
	/>
	{#if value !== ''}
		<div class="dropdown-menu !w-full">
			{#each data as item}
				<div class="dropdown-menu-item" on:click={handleClick}>
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
