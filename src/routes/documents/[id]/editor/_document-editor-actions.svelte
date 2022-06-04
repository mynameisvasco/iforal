<script lang="ts">
	import { goto } from '$app/navigation';
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
		<MenuItem
			class="dropdown-menu-item"
			on:click={async () => goto(`/documents/${document.id}/header`)}
		>
			Editar Cabeçalho
		</MenuItem>
		<MenuItem
			class="dropdown-menu-item"
			on:click={async () => goto(`/documents/${document.id}/images`)}
		>
			Editar Imagens
		</MenuItem>
		<MenuItem class="dropdown-menu-item !text-red-500 dark:!text-red-300">Apagar</MenuItem>
	</MenuItems>
</Menu>
