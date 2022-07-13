<script lang="ts">
	import { session } from '$app/stores';
	import { theme } from '$lib/components/stores/theme';

	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import Avatar from '../avatar/avatar.svelte';
	import Toggle from '../toggle/toggle.svelte';
</script>

<div class="flex items-center gap-6">
	<Menu>
		<MenuButton class="flex gap-3 items-center text-sm rounded-full ">
			<Avatar name={$session?.name} />
			<span class="text-stone-900 dark:text-white">
				{$session?.name}
			</span>
		</MenuButton>
		<MenuItems class="dropdown-menu">
			<MenuItem class="dropdown-menu-item">Perfil</MenuItem>
			<MenuItem class="dropdown-menu-item" href="/auth/logout">Sair</MenuItem>
		</MenuItems>
	</Menu>
	<Toggle on:toggle={theme.toggle} initalState={$theme === 'dark'} />
</div>
