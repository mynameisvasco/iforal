<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$lib/forms';
	import { modals } from '$stores/modals';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, Icon } from 'svelte-hero-icons';

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
	action="/documents/{$page.data.document.id}?_method=DELETE"
	method="post"
	use:enhance
	bind:this={deleteForm}
/>

<Menu class="relative">
	<MenuButton>
		<button type="button" class="btn btn-secondary flex items-center">
			Ações
			<Icon src={ChevronDown} class="w-4 ml-1" />
		</button>
	</MenuButton>
	<MenuItems class="dropdown-menu">
		<MenuItem
			class="dropdown-menu-item"
			href="/documents/{$page.data.document.id}/header"
			data-sveltekit-prefetch
		>
			Editar Cabeçalho
		</MenuItem>
		<MenuItem
			class="dropdown-menu-item"
			href="/documents/{$page.data.document.id}/images"
			data-sveltekit-prefetch
		>
			Editar Imagens
		</MenuItem>
		<MenuItem class="dropdown-menu-item !text-red-500 dark:!text-red-300" on:click={handleDelete}>
			Apagar
		</MenuItem>
	</MenuItems>
</Menu>
