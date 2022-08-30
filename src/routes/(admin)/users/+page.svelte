<script lang="ts">
	import Badge from '$lib/components/badge.svelte';
	import Table from '$lib/components/table.svelte';
	import { enhance } from '$lib/forms';
	import type { Modal } from '$stores/modals';
	import { Menu, MenuButton, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, Icon, UserAdd } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';

	export let data: PageData;

	const confirmDeleteModal: Modal = {
		id: 'delete-user',
		title: 'Apagar Utilizador',
		description:
			'Após decidir apagar este utilizador não existe forma de recuperar qualquer tipo de dados.',
		actionName: 'Apagar',
		type: 'danger'
	};
</script>

<svelte:head>
	<title>iForal - Utilizadores</title>
</svelte:head>

<PageHeader title="Utilizadores">
	<a href="/users/invite" class="btn btn-primary" data-sveltekit-prefetch>
		<Icon src={UserAdd} solid class="w-5 mr-1" /> Convidar
	</a>
</PageHeader>
<PageBody>
	<Table headers={['Nome', 'Email', 'Estado', 'Cargo', 'Ações']} data={data.users} let:item>
		<tr>
			<td
				class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-stone-900 
				dark:text-white sm:pl-6"
			>
				{item.name}
			</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
				{item.email}
			</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
				<Badge type={item.status === 'Active' ? 'success' : 'warning'}>
					{item.status}
				</Badge>
			</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
				{item.role}
			</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
				<Menu class="relative">
					<MenuButton class="flex items-center text-stone-900 dark:text-orange-300 text-sm">
						Ações <Icon src={ChevronDown} class="w-5 ml-1" />
					</MenuButton>
					<MenuItems class="dropdown-menu">
						<form
							class="dropdown-menu-item"
							action="/users/{item.id}?_method=delete"
							method="post"
							use:enhance={{ confirmModal: confirmDeleteModal }}
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
</PageBody>
