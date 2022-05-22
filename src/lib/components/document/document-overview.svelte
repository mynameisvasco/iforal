<script lang="ts">
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';

	import { DotsVertical, Icon } from 'svelte-hero-icons';

	export let title: string;
	export let coverUrl: string;
</script>

<div class="flex flex-col card hover:border-orange-500 dark:hover:border-orange-300">
	<img src={coverUrl} alt="Imagem ilustrativa do foral" class="h-72 object-cover rounded-t-lg" />
	<div class="p-3 border-t border-stone-300 dark:border-stone-700 rounded-b-lg">
		<div class="flex justify-between items-center">
			<div class="flex flex-col">
				<h2 class="text-stone-900 dark:text-white font-medium text-md">{title}</h2>
				<span class="text-stone-500 dark:text-stone-400 text-sm">13 Maio, 13:44</span>
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
					<MenuItem class="dropdown-menu-item">Abrir em novo separador</MenuItem>
					<MenuItem class="dropdown-menu-item">Alterar nome</MenuItem>
					<MenuItem class="dropdown-menu-item">Download</MenuItem>
					<MenuItem class="dropdown-menu-item !text-red-600 dark:!text-red-300">Apagar</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	</div>
</div>
