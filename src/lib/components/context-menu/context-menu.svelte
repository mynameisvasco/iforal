<script lang="ts">
	import { Menu, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { createContextMenu, type ContextMenuStore } from '$lib/components/stores/context-menu';
	import { ChevronRight, Icon } from 'svelte-hero-icons';
	import { slide } from 'svelte/transition';

	export let contextMenu: ContextMenuStore;
	export let subContextMenus = new Map<string, ContextMenuStore>();

	function handleMouseDown() {
		contextMenu.toggle([0, 0]);
	}

	function handleMouseEnterSubMenu(subMenuName: string, index: number) {
		subContextMenus.get(subMenuName)?.toggle([375, index != 0 ? index * 34 + 1 : -8]);
	}

	function handleMouseLeaveSubMenu(subMenuName: string) {
		subContextMenus.get(subMenuName)?.toggle([0, 0]);
	}

	$: {
		if (contextMenu) {
			for (const item of $contextMenu.menu.filter((m) => !!m.subMenu)) {
				subContextMenus.set(item.name, createContextMenu(item.subMenu));
			}
		}
	}
</script>

{#if $contextMenu.isOpened}
	<Menu
		class="absolute z-20"
		style="left: {$contextMenu.coordinates[0]}px; top: {$contextMenu.coordinates[1]}px"
		on:mousedown={handleMouseDown}
		on:mouseleave={() => contextMenu.toggle([0, 0])}
	>
		<MenuItems class="dropdown-menu" static>
			{#each $contextMenu.menu as item, i}
				{#if item.subMenu}
					<MenuItem
						class="dropdown-menu-item"
						on:mouseenter={() => handleMouseEnterSubMenu(item.name, i)}
						on:mouseleave={() => handleMouseLeaveSubMenu(item.name)}
					>
						{item.name}
						<Icon src={ChevronRight} class="w-4 text-stone-500" />
					</MenuItem>
					<div
						on:mouseenter={() => handleMouseEnterSubMenu(item.name, i)}
						on:mouseleave={() => handleMouseLeaveSubMenu(item.name)}
					>
						<svelte:self contextMenu={subContextMenus.get(item.name)} />
					</div>
				{:else}
					<MenuItem class="dropdown-menu-item" on:mousedown={handleMouseDown}>
						{item.name}
					</MenuItem>
				{/if}
			{/each}
		</MenuItems>
	</Menu>
{/if}
