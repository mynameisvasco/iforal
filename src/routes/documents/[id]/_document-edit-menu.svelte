<script lang="ts">
	import { tags } from '$lib/tags';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, Icon } from 'svelte-hero-icons';
</script>

<div class="flex gap-4">
	{#each Array.from(new Set($tags.map((t) => t.category))) as category}
		<Menu class="relative">
			<MenuButton>
				<button class="btn btn-tertiary flex items-center">
					{category}
					<Icon src={ChevronDown} class="w-4 ml-1" />
				</button>
			</MenuButton>
			<MenuItems class="dropdown-menu">
				{#each $tags.filter((t) => t.category === category) as tag}
					<MenuItem href="/documents/{1}/header" class="dropdown-menu-item">
						{tag.friendlyName}
					</MenuItem>
				{/each}
			</MenuItems>
		</Menu>
	{/each}
</div>
