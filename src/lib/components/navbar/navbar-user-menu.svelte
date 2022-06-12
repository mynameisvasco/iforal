<script lang="ts">
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	import { api } from '$lib/util/api';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import Avatar from '../avatar/avatar.svelte';
	import Toggle from '../toggle/toggle.svelte';

	async function handleLogout() {
		const { status } = await api.post(fetch, '/api/auth/logout');

		if (status === 200) {
			await goto('/auth/login');
		}
	}
</script>

<div class="flex items-center gap-6">
	<Menu>
		<MenuButton class="flex gap-3 items-center text-sm rounded-full ">
			<Avatar name={$session.name} />
			<span class="text-stone-900 dark:text-white">
				{$session.name}
			</span>
		</MenuButton>
		<MenuItems class="dropdown-menu">
			<MenuItem class="dropdown-menu-item">Perfil</MenuItem>
			<MenuItem class="dropdown-menu-item" on:click={handleLogout}>Sair</MenuItem>
		</MenuItems>
	</Menu>
	<Toggle on:toggle={theme.toggle} initalState={$theme === 'dark'} />
</div>
