<script lang="ts">
	import { page } from '$app/stores';

	export let path: string;
</script>

<a
	class="block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
	href={path}
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
>
	<slot />
</a>
