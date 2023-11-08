<script lang="ts">
	import { enhance } from '$app/forms';
	import { modals } from '$stores/modals';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { formHandler } from '$lib/forms';
	import { page } from '$app/stores';

	export let id: number;

	let deleteForm: HTMLFormElement;
	async function handleDelete() {
		modals.open({
			id: 'delete-document',
			title: 'Apagar documento',
			description:
				'Após decidir apagar este documento não existe forma de recuperar qualquer tipo de dados, sejam estes metadados, imagens ou o corpo do documento.',
			actionName: 'Apagar',
			type: 'danger',
			onAction: () => deleteForm.dispatchEvent(new SubmitEvent('submit'))
		});
	}
</script>

<form
	action="/documents/{id}?/destroy"
	method="POST"
	use:enhance={formHandler()}
	bind:this={deleteForm}
/>

<Menu class="relative">
	<MenuButton>
		<slot />
	</MenuButton>
	<MenuItems class="dropdown-menu">
		<MenuItem class="dropdown-menu-item" href="/documents/{id}/download">Download</MenuItem>
		{#if $page.data.user.id !== 0}
			<MenuItem class="dropdown-menu-item" href="/documents/{id}/header">Editar Cabeçalho</MenuItem>
			<MenuItem class="dropdown-menu-item" href="/documents/{id}/images">Editar Imagens</MenuItem>
			<MenuItem class="dropdown-menu-item !text-red-600 dark:!text-red-300" on:click={handleDelete}>
				Apagar
			</MenuItem>
		{/if}
	</MenuItems>
</Menu>
