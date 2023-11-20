<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { EditorView } from '@codemirror/view';
	import { createTeiEditor, editorSettings } from '$stores/editor';
	import Gallery from '$lib/components/gallery.svelte';
	import EditorTagsMenu from './editor-tags-menu.svelte';
	import EditorSettingsMenu from './editor-settings-menu.svelte';
	import { page } from '$app/stores';
	import Keyboard from 'svelte-keyboard';
	import Dragabble from '../dragabble.svelte';

	const keys = [
		{ row: 1, value: '⁊' },
		{ row: 2, value: 'ñ' },
		{ row: 3, value: 'ã' },
		{ row: 4, value: 'ẽ' },
		{ row: 5, value: 'ĩ' },
		{ row: 6, value: 'õ' },
		{ row: 7, value: 'ũ' },
		{ row: 8, value: 'ꝯ' },
		{ row: 9, value: 'ꝰ' },
		{ row: 10, value: 'Ñ' },
		{ row: 11, value: 'Ã' },
		{ row: 12, value: 'Ẽ' },
		{ row: 13, value: 'Ĩ' },
		{ row: 14, value: 'Õ' },
		{ row: 15, value: 'Ũ' },
		{ row: 16, value: 'Ꝯ' },
		{ row: 17, value: 'ᵃ' },
		{ row: 18, value: 'ᵉ' },
		{ row: 19, value: 'ⁱ' },
		{ row: 20, value: 'ᵒ' },
		{ row: 21, value: 'ᵘ' },
		{ row: 22, value: 'ᶜ' },
		{ row: 23, value: 'ʳ' },
		{ row: 24, value: 'ˡ' },
		{ row: 25, value: 'ᵐ' },
		{ row: 26, value: 'ˢ' },
		{ row: 27, value: 'ˣ' },
		{ row: 28, value: 'ᵗ' },
		{ row: 29, value: 'ꟹ' }
	];
	let editor = writable({} as EditorView);
	const isReadOnly =
		!$page.data.user.id ||
		($page.data.document.user.id !== $page.data.user.id &&
			$page.data.document.permissions.filter(
				(p: any) => p.type === 0 && p.userId === $page.data.user.id
			).length !== 0);

	setContext('editor', editor);

	onMount(async () => {
		const editorElement = document.getElementById('editor') as HTMLElement;
		$editor = createTeiEditor(editorElement, isReadOnly, $page.data.document, $page.data.tags);
	});

	const onKeydown = (event: CustomEvent) => {
		$editor.dispatch({
			changes: {
				from: $editor.state.selection.main.from,
				to: $editor.state.selection.main.to,
				insert: event.detail
			},
			selection: { anchor: $editor.state.selection.main.from + 1 }
		});
	};
</script>

<div class="h-full">
	<div
		class="flex flex-col w-full bg-stone-50 dark:bg-stone-900 p-1 
		rounded-t-md border border-stone-300 dark:border-stone-700 "
	>
		<div class="flex items-center justify-between gap-1 h-10">
			<EditorTagsMenu tags={$page.data.tags} />
			<EditorSettingsMenu />
		</div>
	</div>

	<div id="editor" class:hidden={$editorSettings.isPreviewMode} />
</div>

{#if $editorSettings.isVirtualKeyboardVisible}
	<Dragabble title="Teclado virtual">
		<Keyboard custom={keys} on:keydown={onKeydown} --stroke-width="0px" />
	</Dragabble>
{/if}
