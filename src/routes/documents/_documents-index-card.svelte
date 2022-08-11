<script lang="ts">
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { format as formatDate } from 'date-fns';
	import { DotsVertical, Icon } from 'svelte-hero-icons';

	import type { Document, DocumentImages } from '@prisma/client';
	import { modals } from '$lib/client/modals';
	import { enhance } from '$lib/client/forms';
	import pt from 'date-fns/locale/pt/index.js';

	export let document: Document & { images: DocumentImages[] };
	let deleteForm: HTMLFormElement;

	async function handleDelete() {
		modals.open({
			id: 'delete-document',
			title: 'Apagar Documento',
			description:
				'Após decidir apagar este documento não existe forma de recuperar qualquer tipo de dados, sejam estes metadados, imagens ou o corpo do documento.',
			actionName: 'Apagar',
			type: 'danger',
			onAction: () => deleteForm.dispatchEvent(new SubmitEvent('submit'))
		});
	}
</script>

<form
	action="/documents/{document.id}?_method=DELETE"
	method="post"
	use:enhance
	bind:this={deleteForm}
/>

<div class="flex flex-col card hover:border-stone-900 dark:hover:border-orange-300">
	<a href="/documents/{document.id}" sveltekit:prefetch>
		<img
			src="/api/storage/{document.images.at(0)?.name}"
			alt="Imagem ilustrativa do foral"
			class="h-72 object-cover rounded-t-lg w-full"
		/>
	</a>
	<div class="p-3 border-t border-stone-300 dark:border-stone-700 rounded-b-lg">
		<div class="flex justify-between items-center">
			<div class="flex flex-col">
				<h2 class="text-stone-900 dark:text-white font-medium text-md">{document.title}</h2>
				<span class="text-stone-500 dark:text-stone-400 text-sm">
					{formatDate(new Date(document.createdAt), 'dd MMMM, HH:mm', { locale: pt })}
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
						<a href="/documents/{document.id}" target="_blank" sveltekit:prefetch>
							Abrir em novo separador
						</a>
					</MenuItem>
					<MenuItem class="dropdown-menu-item">Download</MenuItem>
					<MenuItem
						class="dropdown-menu-item !text-red-600 dark:!text-red-300"
						on:click={handleDelete}
					>
						Apagar
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	</div>
</div>
