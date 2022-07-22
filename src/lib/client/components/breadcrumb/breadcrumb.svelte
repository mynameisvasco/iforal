<script lang="ts">
	import { page } from '$app/stores';

	import { breadcrumb } from '$lib/client/breadcrumb';
	import { ChevronRight, Home, Icon } from 'svelte-hero-icons';

	breadcrumb.init();
</script>

<nav class="flex border-b border-stone-300 dark:border-stone-700 pb-6" aria-label="Breadcrumb">
	<ol class="flex items-center space-x-4">
		<li>
			<div>
				<a
					href="/documents"
					class="text-stone-400 hover:text-stone-500 dark:text-stone-400 
					dark:hover:text-stone-300"
				>
					<Icon src={Home} solid class="w-5" />
				</a>
			</div>
		</li>

		{#each $breadcrumb as crumb}
			<li>
				<div class="flex items-center ">
					<Icon src={ChevronRight} class="w-5 text-stone-400 dark:text-stone-500" solid />
					<a
						class="ml-4 text-sm font-medium text-stone-500 hover:text-stone-600 
						dark:text-stone-400 dark:hover:text-stone-300"
						class:text-stone-800={$page.url.pathname === crumb.url}
						class:dark:text-stone-300={$page.url.pathname === crumb.url}
						href={crumb.url}
						sveltekit:prefetch
					>
						{crumb.name}
					</a>
				</div>
			</li>
		{/each}
	</ol>
</nav>
