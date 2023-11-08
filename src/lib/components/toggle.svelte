<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from 'svelte-hero-icons';

	export let initalState = false;
	export let icon: any = undefined;

	const dispatcher = createEventDispatcher();
	let isToggled = initalState;

	function handleToggled() {
		isToggled = !isToggled;
		dispatcher('toggle', { isToggled: !isToggled });
	}
</script>

<div class="flex gap-2">
	<button
		type="button"
		class="toggle"
		class:bg-stone-200={!isToggled}
		class:bg-orange-500={isToggled}
		class:dark:bg-stone-400={!isToggled}
		class:dark:bg-orange-300={isToggled}
		on:click={handleToggled}
	>
		<span
			class:translate-x-5={isToggled}
			class:translate-x-0={!isToggled}
			class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-stone-800
			shadow transform ring-0 transition ease-in-out duration-200"
		/>
	</button>
	{#if icon}
		<Icon src={icon} solid class="w-5 text-stone-900 dark:text-white mt-0.5" />
	{/if}
</div>
