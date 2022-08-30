<script lang="ts">
	import { editorSettings } from '$stores/editor';
	import { viewerSettings } from '$stores/viewer';
	import { ArrowLeft, ArrowRight, Code, Icon, Minus, Plus } from 'svelte-hero-icons';

	function handleFontSizeIncrease() {
		viewerSettings.update((old) => ({ ...old, fontSize: old.fontSize + 1 }));
	}

	function handleFontSizeDecrease() {
		viewerSettings.update((old) => ({ ...old, fontSize: old.fontSize - 1 }));
	}

	function handleToggleFullWidth() {
		viewerSettings.update((old) => ({ ...old, isFullWidth: !old.isFullWidth }));
	}

	function handleToggleViewMode() {
		viewerSettings.update((old) => ({ ...old, isViewerMode: !old.isViewerMode }));
		editorSettings.update((old) => ({ ...old, isEditorMode: !old.isEditorMode }));
	}
</script>

<div class="flex items-center gap-2">
	<button type="button" class="btn-editor" on:click={handleToggleViewMode}>
		<Icon src={Code} class="w-5 text-stone-500 dark:text-stone-400" solid />
	</button>
	<button type="button" class="btn-editor" on:click={handleToggleFullWidth}>
		<Icon
			src={$viewerSettings.isFullWidth ? ArrowLeft : ArrowRight}
			class="w-5 text-stone-500 dark:text-stone-400"
			solid
		/>
	</button>
	<div class="h-6 border-r border-stone-300 dark:border-stone-700" />
	<button type="button" on:click={handleFontSizeDecrease}>
		<Icon src={Minus} class="w-5 text-stone-500 dark:text-stone-400" solid />
	</button>
	<input
		min={8}
		max={40}
		type="number"
		class="text-sm hover:bg-stone-200 dark:bg-stone-800 py-0.5 px-1 rounded-md border 
    border-stone-300 dark:border-stone-700 font-medium ring-0 focus:ring-1 
    focus:ring-orange-300 w-7 text-stone-900 dark:text-white"
		bind:value={$viewerSettings.fontSize}
	/>
	<button type="button" on:click={handleFontSizeIncrease}>
		<Icon src={Plus} class="w-5 text-stone-500 dark:text-stone-400" solid />
	</button>
</div>

<style>
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
