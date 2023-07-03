<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import SideCover from '$lib/components/side-cover.svelte';
	import { formHandler } from '$lib/forms';
	import { stripTeiTags } from '$lib/tei';
	import type { Notification } from '$stores/notifications';
	import type { GlossaryEntry } from '@prisma/client';
	import { onMount } from 'svelte';
	import { ClipboardCopy, Icon } from 'svelte-hero-icons';
	import InputList from '../input-list.svelte';

	export let sideCover: any;

	let lemma = '';
	let actualLema = '';
	let definition = '';
	let tags = '';
	let actual = '';
	let context = '';
	let isOpen = false;
	let translations: {};
	let addingTranslations = { language: '', value: '' };
	let entries: GlossaryEntry[] = [];

	onMount(() => {
		document.addEventListener(`selectionchange`, () => {
			const selectedText = document.getSelection()?.toString() ?? '';
			const strippedBody = stripTeiTags($page.data.document.body);
			context = isOpen
				? context
				: strippedBody
						.match(new RegExp(`(\\S+\\s+){0,${10}}${selectedText}(\\s+\\S+){0,${10}}`, 'gi'))
						?.at(0) ?? '';

			actual = isOpen ? actual : selectedText.replace(/([0-9]*)/g, '') ?? '';
		});
	});

	const createdSuccessNotification: Notification = {
		title: 'Entrada adicionada',
		message: 'A nova entrada do glossário foi adicionada',
		type: 'success'
	};

	async function handleLemmaChange() {
		const response = await fetch(`/glossary/${lemma}`);
		const entry = await response.json();
		entries = entry;
	}

	function handleSelectGlossaryEntry(entry: any) {
		definition = entry.definition;
		tags = entry.tags;
		actualLema = entry.actualLema;
		translations = entry.translations;
	}
</script>

<SideCover
	title="Adicionar palavra no glossário"
	description="Adicione uma nova palavra ao glossário, especificando o seu lema e definição."
	bind:this={sideCover}
	bind:isOpen
>
	<form
		id="glossaryEntryAdd"
		method="POST"
		action="/glossary/create"
		use:enhance={formHandler(createdSuccessNotification, false, () => handleLemmaChange())}
	>
		<div class="grid grid-cols-12 gap-3 mb-6">
			<div class="col-span-12 flex flex-col gap-1">
				<label for="title" class="label">Forma</label>
				<input type="text" class="input disabled" name="actual" bind:value={actual} />
			</div>
			<div class="col-span-12 lg:col-span-6 flex flex-col gap-1">
				<label for="title" class="label">Lema</label>
				<input
					type="text"
					class="input"
					placeholder=""
					name="lemma"
					bind:value={lemma}
					on:change={handleLemmaChange}
				/>
			</div>
			<div class="col-span-12 lg:col-span-6  flex flex-col gap-1">
				<label for="title" class="label">Lema Atualizado</label>
				<input type="text" class="input" placeholder="" name="actualLema" bind:value={actualLema} />
			</div>
			<div class="col-span-12 flex flex-col gap-1">
				<label for="title" class="label">Categoria</label>
				<select name="category" class="input">
					<option value="Subtantivo">Substantivo</option>
					<option value="Adjetivo">Adjetivo</option>
					<option value="Verbo">Verbo</option>
					<option value="Advérbio">Advérbio</option>
					<option value="Numeral">Numeral</option>
					<option value="Locução">Locução</option>
					<option value="Locução Verbal">Locução Verbal</option>
					<option value="Locução Adverbial">Locução Adverbial</option>
					<option value="Antropónimo">Antropónimo</option>
					<option value="Topónimo">Topónimo</option>
				</select>
			</div>
			<div class="col-span-12 flex flex-col gap-1">
				<label for="title" class="label">Etiquetas</label>
				<select class="input" name="tags" bind:value={tags}>
					<option value="Agressões e ofensas">Agressões e ofensas</option>
					<option value="Atividades e agentes económicos">Atividades e agentes económicos</option>
					<option value="Autoridades e funções municipais">Autoridades e funções municipais</option>
					<option value="Documentação e afins">Documentação e afins</option>
					<option value="Edifícios e estruturas">Edifícios e estruturas</option>
					<option value="Foro municipal">Foro municipal</option>
					<option value="Guerra">Guerra</option>
					<option value="Igreja e clero">Igreja e clero</option>
					<option value="Impostos">Impostos</option>
					<option value="Justiça">Justiça</option>
					<option value="Meios de produção">Meios de produção</option>
					<option value="Medidas e pesos">Medidas e pesos</option>
					<option value="Moedas">Moedas</option>
					<option value="Oficiais régios e órgãos da corte">
						Oficiais régios e órgãos da corte
					</option>
					<option value="Paisagem rural">Paisagem rural</option>
					<option value="Penas e coimas">Penas e coimas</option>
					<option value="Perturbação da ordem">Perturbação da ordem</option>
					<option value="Produtos e Recursos">Produtos e Recursos</option>
					<option value="Sociedade">Sociedade</option>
					<option value="Território">Território</option>
				</select>
			</div>
			<div class="col-span-12 flex flex-col gap-1">
				<label for="title" class="label">Definição</label>
				<textarea class="input" rows="4" name="definition" bind:value={definition} />
			</div>
			<div class="col-span-12 flex flex-col gap-1">
				<label for="title" class="label">Contexto</label>
				<textarea class="input" rows="4" name="context" bind:value={context} />
			</div>
			<div class="col-span-12 flex flex-col gap-1">
				<label for="title" class="label">Traduções</label>
				<InputList id="translations" bind:addingValues={addingTranslations} value={translations}>
					<span slot="list" let:value>
						<div class="flex flex-col">
							<p class="text-sm font-medium text-stone-900 dark:text-white">{value.value}</p>
							<p class="text-sm text-stone-500 dark:text-stone-300">{value.language}</p>
						</div>
					</span>
					<span slot="inputs" let:handleAdd class="flex gap-6 flex-1">
						<input
							type="text"
							class="input"
							placeholder=""
							bind:value={addingTranslations.value}
							on:blur={handleAdd}
						/>
						<select class="input" bind:value={addingTranslations.language} on:blur={handleAdd}>
							<option disabled value="">Selecionar língua</option>
							<option value="mediaval-latim">Latim medieval</option>
							<option value="latin">Latim clássico</option>
							<option value="english">Inglês</option>
							<option value="french">Francês</option>
							<option value="spanish">Castelhano</option>
						</select>
					</span>
				</InputList>
			</div>
		</div>
		<input type="hidden" name="documentId" value={$page.params.id} />
	</form>
	<div class="flex flex-col gap-3">
		{#if entries.length !== 0}
			<div class="label">Entradas existentes</div>
		{/if}
		{#each Array.from(new Set(entries.map((e) => e.definition))) as definition}
			{@const entry = entries.find((e) => e.definition === definition) ?? {
				definition: '',
				lemma: '',
				category: ''
			}}
			<div class="border-b border-stone-200 dark:border-stone-700 my-1" />
			<div class="flex justify-between">
				<div class="flex flex-col">
					<h2 class="text-stone-900 dark:text-white font-medium text-md">
						{entry.lemma}
						<span class="text-xs text-stone-500 dark:text-stone-300"> ({entry.category})</span>
					</h2>
					<span class="text-stone-500 dark:text-stone-400 text-sm">
						{entries
							.filter((e) => e.definition === entry.definition)
							.map((e) => e.actual)
							.join(',')}
					</span>
				</div>
				<div>
					<button on:click={() => handleSelectGlossaryEntry(entry)}>
						<Icon src={ClipboardCopy} solid class="w-5 text-stone-700 dark:text-stone-300" />
					</button>
				</div>
			</div>
		{/each}
	</div>
	<svelte:fragment slot="action">
		<button type="submit" form="glossaryEntryAdd" class="btn btn-primary">Adicionar</button>
	</svelte:fragment>
</SideCover>
