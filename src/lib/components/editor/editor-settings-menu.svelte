<script lang="ts">
	import { getContext } from 'svelte';
	import {
		ArrowLeft,
		ArrowRight,
		Code,
		Eye,
		Icon,
		MenuAlt2,
		Minus,
		Plus,
		Search
	} from 'svelte-hero-icons';
	import xmlFormat from 'xml-formatter';
	import type { Writable } from 'svelte/store';
	import type { EditorView } from '@codemirror/view';
	import { editorSettings } from '$stores/editor';
	import { openSearchPanel } from '@codemirror/search';

	const editor = getContext<Writable<EditorView>>('editor');

	function handleFontSizeIncrease() {
		editorSettings.update((old) => ({ ...old, fontSize: old.fontSize + 1 }));
	}

	function handleFontSizeDecrease() {
		editorSettings.update((old) => ({ ...old, fontSize: old.fontSize - 1 }));
	}

	function handleToggleFullWidth() {
		editorSettings.update((old) => ({ ...old, isFullWidth: !old.isFullWidth }));
	}

	function handleFormat() {
		const text = $editor.state.sliceDoc(0, $editor.state.doc.length);
		$editor.dispatch({
			changes: {
				from: 0,
				to: $editor.state.doc.length,
				insert: xmlFormat(text, { collapseContent: true, indentation: ' ' })
			}
		});
	}
</script>

<div class="flex items-center gap-2">
	<button type="button" class="btn-editor" on:click={() => openSearchPanel($editor)}>
		<Icon src={Search} class="w-5 text-stone-500 dark:text-stone-400" solid />
	</button>
	<button type="button" class="btn-editor" on:click={handleFormat}>
		<Icon src={MenuAlt2} class="w-5 text-stone-500 dark:text-stone-400" solid />
	</button>
	<button type="button" class="btn-editor" on:click={handleToggleFullWidth}>
		<Icon
			src={$editorSettings.isFullWidth ? ArrowLeft : ArrowRight}
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
		bind:value={$editorSettings.fontSize}
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
