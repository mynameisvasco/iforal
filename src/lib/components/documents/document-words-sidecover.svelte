<script lang="ts">
	import { page } from '$app/stores';
	import SideCover from '$lib/components/side-cover.svelte';
	import { stripTeiTags } from '$lib/tei';
	import { Icon, Tag } from 'svelte-hero-icons';

	let sideCover: any;
	let words: Set<string> = new Set();

	$: words = new Set(
		stripTeiTags($page.data.document.body)
			.replace(/[\p{P}$+<=>^`|~]/gu, '')
			.split(' ')
			.filter((w) => w !== '')
			.sort()
	);
</script>

<SideCover
	title="Índice de palavras"
	description="Identifique as palavras únicas do documento ordenadas alfabéticamente."
	bind:this={sideCover}
>
	<div class="flex flex-col gap-2">
		{#each Array.from(words) as word}
			<span>{word}</span>
		{/each}
	</div>
</SideCover>
<button type="button" class="btn btn-secondary" on:click={sideCover.toggle}>
	<Icon src={Tag} solid class="w-5 mr-1" />
	Índice
</button>
