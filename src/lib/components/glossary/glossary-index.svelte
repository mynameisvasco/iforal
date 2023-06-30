<script lang="ts">
	import { page } from '$app/stores';

	const index = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
</script>

<div class="flex items-center gap-2">
	{#each index.split(' ') as letter}
		<a
			href="/glossary?letter={letter}"
			class="text-stone-900 dark:text-stone-300"
			class:dark:!text-orange-300={$page.url.searchParams.get('letter') === letter ||
				(!$page.url.searchParams.get('letter') && letter === 'a')}
			class:underline={$page.url.searchParams.get('letter') === letter ||
				(!$page.url.searchParams.get('letter') && letter === 'a')}
		>
			{letter}
		</a>
	{/each}
</div>
