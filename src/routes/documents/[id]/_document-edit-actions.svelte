<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, Icon } from 'svelte-hero-icons';

	const documentId = parseInt($page.params.id);
</script>

<Menu class="relative">
	<MenuButton>
		<button type="button" class="btn btn-secondary flex items-center">
			Ações
			<Icon src={ChevronDown} class="w-4 ml-1" />
		</button>
	</MenuButton>
	<MenuItems class="dropdown-menu">
		<MenuItem href="/documents/{documentId}/header" class="dropdown-menu-item">
			Editar Cabeçalho
		</MenuItem>
		<MenuItem href="/documents/{documentId}/images" class="dropdown-menu-item">
			Editar Imagens
		</MenuItem>
		<MenuItem class="dropdown-menu-item !text-red-500 dark:!text-red-300">Apagar</MenuItem>
	</MenuItems>
</Menu>
