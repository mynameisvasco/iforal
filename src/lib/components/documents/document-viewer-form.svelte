<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { formHandler } from '$lib/forms';
	import { viewerSettings } from '$stores/viewer';
	import { format } from 'date-fns';
	import { Icon, Search, X } from 'svelte-hero-icons';
	import Table from '../table.svelte';

	export let formIndex: number;

	function handleRemoveDocument() {
		viewerSettings.setDocumentId(formIndex, -1);
	}

	function handleOpenDocument(viewerIndex: number, documentId: number) {
		viewerSettings.setDocumentId(viewerIndex, documentId);
	}
</script>

<div class="flex flex-col gap-12 flex-1">
	<form action="/viewer" method="POST" use:enhance={formHandler()}>
		<input type="hidden" id="formIndex" name="formIndex" value={formIndex} />
		<div class="grid grid-cols gap-3 items-center">
			<div class="col-span-12">
				<label class="label" for="title">Título</label>
				<input id="title" name="title" type="text" class="input" placeholder="O meu foral" />
			</div>
			<div class="col-span-12 lg:col-span-2">
				<label class="label" for="year">Ano</label>
				<input
					id="year"
					type="number"
					name="year"
					min="1000"
					max="2099"
					placeholder="1712"
					class="input"
				/>
			</div>
			<div class="col-span-12 lg:col-span-2">
				<label class="label" for="author">Autor</label>
				<input id="author" name="author" type="text" class="input" placeholder="D. XYZ" />
			</div>
			<div class="col-span-12 lg:col-span-2 flex gap-3">
				<button type="submit" class="btn btn-primary mt-6">
					<Icon src={Search} class="w-5" solid />
					Pesquisar
				</button>
				{#if formIndex > 0}
					<button on:click={handleRemoveDocument} type="button" class="btn btn-secondary mt-6">
						<Icon src={X} class="w-5" solid />
					</button>
				{/if}
			</div>
		</div>
	</form>

	<Table
		headers={['Título', 'Ano', 'Abrir']}
		data={$page.form ? $page.form[formIndex]?.documents ?? [] : []}
		let:item
	>
		<tr>
			<td
				class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-stone-900 
				dark:text-white sm:pl-6"
			>
				{item.title}
			</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
				{format(new Date(item.header.originDate), 'yyyy')}
			</td>
			<td class="whitespace-nowrap px-3 py-4 text-sm text-stone-500 dark:text-stone-300">
				<button on:click={() => handleOpenDocument(formIndex, item.id)}>Abrir</button>
			</td>
		</tr>
	</Table>
</div>
