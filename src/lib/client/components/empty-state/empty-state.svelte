<script lang="ts">
	import { Icon } from 'svelte-hero-icons';

	export let icon: any;
	export let title: string;
	export let description: string;
</script>

<div class="text-center">
	<Icon src={icon} class="mx-auto h-12 w-12 text-stone-400 dark:text-stone-600" />
	<h3 class="mt-2 text-sm font-medium text-stone-900 dark:text-white">{title}</h3>
	<p class="mt-1 text-sm text-stone-500">
		{description}
	</p>
	<div class="mt-6 flex items-center justify-center">
		<slot />
	</div>
</div>
