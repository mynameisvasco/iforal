<script lang="ts">
	import type { Document } from '@prisma/client';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { getContext } from 'svelte';
	import { ChevronDown, Icon } from 'svelte-hero-icons';

	const document = getContext<Document>('document');
</script>

<Menu class="relative">
	<MenuButton>
		<button class="btn btn-secondary flex items-center">
			<span>Ações</span>
			<Icon src={ChevronDown} class="w-4 ml-1" />
		</button>
	</MenuButton>
	<MenuItems class="dropdown-menu">
		<MenuItem class="dropdown-menu-item">
			<a href="/documents/{document.id}/header>" sveltekit:prefetch>Editar Cabeçalho</a>
		</MenuItem>
		<MenuItem class="dropdown-menu-item">
			<a href="/documents/{document.id}/images>" sveltekit:prefetch>Editar Imagens</a>
		</MenuItem>
		<MenuItem class="dropdown-menu-item !text-red-500 dark:!text-red-300">Apagar</MenuItem>
	</MenuItems>
</Menu>
