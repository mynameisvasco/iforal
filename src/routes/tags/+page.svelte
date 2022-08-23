<script lang="ts">
	import { enhance } from '$lib/client/forms';
	import Table from '$lib/client/components/table/table.svelte';
	import { ChevronDown, Icon, Plus } from 'svelte-hero-icons';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>iForal - Tags</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Tags de Marcação</h1>
			<a href="/tags/create" class="btn btn-primary" sveltekit:prefetch>
				<Icon src={Plus} solid class="w-5 mr-1" />
				Adicionar
			</a>
		</div>
	</div>
</header>
<main>
	<div class="page-body h-full">
		<Table
			headers={['Nome', 'Nome Amigável', 'Categoria', 'Filhos?', 'Ações']}
			data={data.tags}
			let:item
		>
			<tr>
				<td
					class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-stone-900 
					dark:text-white sm:pl-6"
				>
					{item.name}
				</td>
				<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
					{item.friendlyName}
				</td>
				<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
					{item.category}
				</td>
				<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
					{item.isChildAllowed}
				</td>
				<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
					<Menu class="relative">
						<MenuButton class="flex items-center text-stone-900 dark:text-orange-300 text-sm">
							Ações <Icon src={ChevronDown} class="w-5 ml-1" />
						</MenuButton>
						<MenuItems class="dropdown-menu">
							<MenuItem class="dropdown-menu-item" href="/tags/{item.id}" sveltekit:prefetch>
								Editar
							</MenuItem>
							<form
								class="dropdown-menu-item"
								action="/tags/{item.id}?_method=delete"
								method="post"
								use:enhance
							>
								<button type="submit" class="w-full text-left text-red-700 dark:text-red-300">
									Apagar
								</button>
							</form>
						</MenuItems>
					</Menu>
				</td>
			</tr>
		</Table>
	</div>
</main>
