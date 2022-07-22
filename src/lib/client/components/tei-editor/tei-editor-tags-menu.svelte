<script lang="ts">
	import { tagsMenu } from '$lib/client/tags';
	import { tagToString } from '$lib/common/tags';
	import type { EditorView } from '@codemirror/view';
	import type { Tag } from '@prisma/client';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { getContext } from 'svelte';
	import { ChevronDown, Icon } from 'svelte-hero-icons';
	import type { Writable } from 'svelte/store';

	const editor = getContext<Writable<EditorView>>('editor');

	function handleApplyTag(tag: Tag) {
		const [range] = $editor.state.selection.ranges;
		const text = $editor.state.sliceDoc(range.from, range.to);
		$editor.dispatch($editor.state.replaceSelection(tagToString(tag, text)));
	}
</script>

{#each Array.from(new Set($tagsMenu.map((t) => t.category))) as category}
	<Menu class="relative">
		<MenuButton>
			<button
				class="flex items-center text-sm hover:bg-stone-200 dark:hover:bg-stone-800 
      p-2 rounded-md text-stone-900 dark:text-white font-medium"
			>
				{category}
				<Icon src={ChevronDown} class="w-4 ml-1" />
			</button>
		</MenuButton>
		<MenuItems class="dropdown-menu">
			{#each $tagsMenu.filter((t) => t.category === category) as tag}
				<MenuItem class="dropdown-menu-item" on:click={() => handleApplyTag(tag)}>
					{tag.friendlyName}
				</MenuItem>
			{/each}
		</MenuItems>
	</Menu>
{/each}
