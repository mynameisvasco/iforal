<script>
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, Icon } from 'svelte-hero-icons';
</script>

<Menu class="relative">
	<MenuButton>
		<button class="btn btn-secondary flex items-center">
			<span>Ações</span>
			<Icon src={ChevronDown} class="w-4 ml-1" />
		</button>
	</MenuButton>
	<MenuItems class="dropdown-menu">
		<MenuItem class="dropdown-menu-item">Editar Cabeçalho</MenuItem>
		<MenuItem class="dropdown-menu-item !text-red-500 dark:!text-red-300">Apagar</MenuItem>
	</MenuItems>
</Menu>
