<script lang="ts">
	import { writable } from 'svelte-local-storage-store';

	export let title: string;

	let moving = false;
	let position = writable(`draggable-${title.trim()}`, {
		top: 100,
		left: 100
	});

	function onMouseDown() {
		moving = true;
	}

	function onMouseMove(e: any) {
		if (moving) {
			$position.left += e.movementX;
			$position.top += e.movementY;
		}
	}

	function onMouseUp() {
		moving = false;
	}
</script>

<section
	on:mousedown={onMouseDown}
	style="left: {$position.left}px; top: {$position.top}px;"
	class="draggable border-stone-300 dark:border-stone-700 border p-4 bg-white
	dark:bg-stone-900/75 filter backdrop-blur-sm rounded-md"
>
	<h3 class="label mb-4">{title}</h3>
	<slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

<style>
	.draggable {
		user-select: none;
		cursor: move;
		position: absolute;
	}
</style>
