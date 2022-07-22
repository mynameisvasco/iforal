<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let initalState = false;

	const dispatcher = createEventDispatcher();
	let isToggled = initalState;

	function handleToggled() {
		isToggled = !isToggled;
		dispatcher('toggle', { isToggled: !isToggled });
	}
</script>

<button
	type="button"
	class="toggle"
	class:bg-stone-200={!isToggled}
	class:bg-orange-500={isToggled}
	class:dark:bg-stone-700={!isToggled}
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
