<script lang="ts">
	import { page } from '$app/stores';

	export let path: string;
</script>

<a
	href={path}
	class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
	class:border-stone-500={$page.url.pathname === path}
	class:text-stone-900={$page.url.pathname === path}
	class:border-transparent={$page.url.pathname !== path}
	class:text-stone-500={$page.url.pathname !== path}
	class:hover:text-stone-700={$page.url.pathname !== path}
	class:hover:border-stone-300={$page.url.pathname !== path}
	class:dark:border-orange-300={$page.url.pathname === path}
	class:dark:text-orange-300={$page.url.pathname === path}
	class:dark:border-transparent={$page.url.pathname !== path}
	class:dark:text-stone-300={$page.url.pathname !== path}
	class:dark:hover:text-stone-200={$page.url.pathname !== path}
	class:dark:hover:border-stone-200={$page.url.pathname !== path}
	data-sveltekit-prefetch
>
	<slot />
</a>
