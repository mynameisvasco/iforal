<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
	import Toggle from '../toggle/toggle.svelte';
</script>

<div class="flex items-center gap-6">
	<Menu>
		<MenuButton class="flex gap-3 items-center text-sm rounded-full ">
			<img
				class="h-8 w-8 rounded-full"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt="Me"
			/>
			<span class="text-stone-900 dark:text-white"> Vasco Sousa </span>
		</MenuButton>
		<MenuItems class="dropdown-menu">
			<MenuItem class="dropdown-menu-item">Perfil</MenuItem>
			<MenuItem class="dropdown-menu-item">Sair</MenuItem>
		</MenuItems>
	</Menu>
	<Toggle on:toggle={theme.toggle} initalState={$theme === 'dark'} />
</div>
