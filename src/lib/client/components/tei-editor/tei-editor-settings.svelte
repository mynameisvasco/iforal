<script lang="ts">
	import { getContext } from 'svelte';
	import { DocumentText, Icon, MenuAlt2, Minus, Plus } from 'svelte-hero-icons';
	import xmlFormat from 'xml-formatter';
	import { editorSettings } from '../stores/editor-settings';
	import type { Writable } from 'svelte/store';
	import type { EditorView } from '@codemirror/view';

	const editor = getContext<Writable<EditorView>>('editor');

	function handleFontSizeIncrease() {
		editorSettings.update((old) => ({ ...old, fontSize: old.fontSize + 1 }));
	}

	function handleFontSizeDecrease() {
		editorSettings.update((old) => ({ ...old, fontSize: old.fontSize - 1 }));
	}

	function handleFormat() {
		const text = $editor.state.sliceDoc(0, $editor.state.doc.length);
		$editor.dispatch({
			changes: { from: 0, to: $editor.state.doc.length, insert: xmlFormat(text) }
		});
	}
</script>

<div class="flex items-center gap-2 ">
	<button
		type="button"
		class="flex items-center text-sm hover:bg-stone-200 dark:hover:bg-stone-800 py-1 px-0.5 
    rounded-md text-stone-900 dark:text-white font-medium mr-2"
		on:click={handleFormat}
	>
		<Icon src={MenuAlt2} class="w-5 mr-1 text-stone-500 dark:text-stone-400" solid />
		Formatar
	</button>
	<div class="h-6 border-r border-stone-300 dark:border-stone-700" />
	<div class="flex items-center">
		<Icon src={DocumentText} class="w-5 mr-1 text-stone-500 dark:text-stone-400" solid />
		<select
			class="text-sm hover:bg-stone-200 dark:bg-stone-800 py-0.5 px-1 rounded-md border 
    border-stone-300 dark:border-stone-700 font-medium ring-0 focus:ring-1 
    focus:ring-orange-300 text-stone-900 dark:text-white"
			bind:value={$editorSettings.editorColSize}
		>
			<option value="6">Pequeno</option>
			<option value="8">Grande</option>
			<option value="12">Ecrã Completo</option>
		</select>
	</div>
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
