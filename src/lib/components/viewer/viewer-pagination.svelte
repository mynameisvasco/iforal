<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { ChevronLeft, ChevronRight, Icon } from 'svelte-hero-icons';
	import type { Writable } from 'svelte/store';

	export let currentPage: Writable<number>;
	export let maxPages: number;
	export let folio: string | undefined | null;
</script>

<div class="flex items-center">
	{#if $currentPage !== 1}
		<button on:click={() => ($currentPage -= 1)}>
			<Icon src={ChevronLeft} class="w-5 text-stone-500 dark:text-stone-400" />
		</button>
	{:else}
		<div class="w-5" />
	{/if}
	<span class="text-sm text-stone-900 dark:text-white"
		>Pagina {$currentPage} de {maxPages} - (Folio {folio})</span
	>
	{#if $currentPage !== maxPages}
		<button on:click={() => ($currentPage += 1)}>
			<Icon src={ChevronRight} class="w-5 text-stone-500 dark:text-stone-400" />
		</button>
	{/if}
</div>
