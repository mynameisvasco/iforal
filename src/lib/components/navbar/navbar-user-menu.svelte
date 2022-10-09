<script lang="ts">
	import { page } from '$app/stores';
	import { theme } from '$stores/theme';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import UserAvatar from '../users/user-avatar.svelte';
	import Toggle from '../toggle.svelte';
</script>

<div class="flex items-center gap-6">
	<Menu>
		<MenuButton class="flex gap-3 items-center text-sm rounded-full ">
			<UserAvatar name={$page.data.user?.name} />
			<span class="text-stone-900 dark:text-white">
				{$page.data.user?.name}
			</span>
		</MenuButton>
		<MenuItems class="dropdown-menu">
			<MenuItem class="dropdown-menu-item" href="/profile">Perfil</MenuItem>
			<MenuItem class="dropdown-menu-item" href="/logout">Sair</MenuItem>
		</MenuItems>
	</Menu>
	<Toggle on:toggle={theme.toggle} initalState={$theme === 'dark'} />
</div>
