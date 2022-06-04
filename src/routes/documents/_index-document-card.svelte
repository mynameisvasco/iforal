<script lang="ts">
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { parseISO, format as formatDate } from 'date-fns';
	import { DotsVertical, Icon } from 'svelte-hero-icons';
	import { pt } from 'date-fns/locale';
	import { createEventDispatcher, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Document } from '@prisma/client';

	export let document: Document;

	const dispatcher = createEventDispatcher();
	let coverUrl = '';
</script>

<div class="flex flex-col card hover:border-stone-900 dark:hover:border-orange-300">
	<img
		src="/api/storage/{document.images.at(0)?.name}"
		alt="Imagem ilustrativa do foral"
		class="h-72 object-cover rounded-t-lg"
		on:click={async () => await goto(`/documents/${document.id}/editor`)}
	/>
	<div class="p-3 border-t border-stone-300 dark:border-stone-700 rounded-b-lg">
		<div class="flex justify-between items-center">
			<div class="flex flex-col">
				<h2 class="text-stone-900 dark:text-white font-medium text-md">{document.title}</h2>
				<span class="text-stone-500 dark:text-stone-400 text-sm">
					{formatDate(parseISO(document.createdAt), 'dd MMMM, HH:mm', { locale: pt })}
				</span>
			</div>
			<Menu class="relative">
				<MenuButton>
					<Icon
						src={DotsVertical}
						class="w-8 p-1 text-stone-900 dark:text-white 
							hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full"
					/>
				</MenuButton>
				<MenuItems class="dropdown-menu">
					<MenuItem class="dropdown-menu-item">
						<a href="/documents/{document.id}/editor" target="_blank">Abrir em novo separador</a>
					</MenuItem>
					<MenuItem class="dropdown-menu-item">Download</MenuItem>
					<MenuItem
						class="dropdown-menu-item !text-red-600 dark:!text-red-300"
						on:click={() => dispatcher('delete', { id: document.id })}
					>
						Apagar
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	</div>
</div>
