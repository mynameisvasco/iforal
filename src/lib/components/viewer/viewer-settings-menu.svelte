<script lang="ts">
	import { Code, Eye, Icon, Minus, Plus, X, Translate, BookOpen } from 'svelte-hero-icons';
	import { editorSettings } from '$stores/editor';
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { viewerSettings, type ViewMode } from '$stores/viewer';

	export let images: any[];
	export let documentId: number;
	export let mode: Writable<ViewMode>;
	export let currentPage: Writable<number>;
	const dispatcher = createEventDispatcher();
	export let glossaryAddSideCover: any;

	function handleFontSizeIncrease() {
		viewerSettings.update((old) => ({ ...old, fontSize: old.fontSize + 1 }));
	}

	function handleFontSizeDecrease() {
		viewerSettings.update((old) => ({ ...old, fontSize: old.fontSize - 1 }));
	}

	function handleCloseViewer() {
		dispatcher('close', { documentId });
	}

	function handleModeChange(event: any) {
		mode.set(event.target.value);
	}

	function handleImagePopup() {
		window.open(`/images/${images[$currentPage - 1]?.name}`, '_blank');
	}

	function handlePreviewMode() {
		editorSettings.update((old) => ({
			...old,
			isPreviewMode: !old.isPreviewMode
		}));
	}
</script>

<div class="flex items-center gap-2">
	<button type="button" class="btn-editor has-tooltip" on:click={handlePreviewMode}>
		<Icon
			src={$editorSettings.isPreviewMode ? Code : Eye}
			class="w-5 text-stone-500 dark:text-stone-400 relative"
			solid
		/>
		<span class="tooltip !w-28">Código Fonte</span>
	</button>
	<button type="button" class="btn-editor has-tooltip" on:click={handleImagePopup}>
		<Icon src={BookOpen} class="w-5 text-stone-500 dark:text-stone-400" solid />
		<span class="tooltip !w-28">Ver Imagens</span>
	</button>
	<button type="button" class="mr-3 has-tooltip" on:click={() => glossaryAddSideCover.toggle()}>
		<Icon src={Translate} class="w-5 text-stone-500 dark:text-stone-400" solid />
		<span class="tooltip !w-28">Adicionar ao glossário</span>
	</button>
	<select name="mode" class="input !py-1" on:change={handleModeChange}>
		<option value="transcription">Ed. Paleográfica</option>
		<option value="edited">Ed. Crítica</option>
	</select>
	<div class="h-6 border-r border-stone-300 dark:border-stone-700" />
	<button type="button" on:click={handleFontSizeDecrease} class="has-tooltip">
		<Icon src={Minus} class="w-5 text-stone-500 dark:text-stone-400" solid />
		<span class="tooltip !w-28">Diminuir fonte</span>
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
	<button type="button" on:click={handleFontSizeIncrease} class="has-tooltip">
		<Icon src={Plus} class="w-5 text-stone-500 dark:text-stone-400" solid />
		<span class="tooltip !w-28">Aumentar fonte</span>
	</button>
	<div class="h-6 border-r border-stone-300 dark:border-stone-700" />
	<button type="button" on:click={handleCloseViewer}>
		<Icon src={X} class="w-5 mr-2 text-stone-500 dark:text-stone-400" solid />
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
