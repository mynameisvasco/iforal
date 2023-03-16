<script lang="ts">
	export let highlights: any = [];
</script>

<div class=" flex flex-col lg:flex-row justify-between p-4">
	<ol class="flex flex-col gap-3 divide-y divide-stone-300 dark:divide-stone-700">
		{#if highlights}
			{#each highlights as highlight}
				<li class="text-stone-900 dark:text-white list-decimal ml-4 pt-2">
					...{@html highlight}...
				</li>
			{/each}
		{/if}
	</ol>
</div>
