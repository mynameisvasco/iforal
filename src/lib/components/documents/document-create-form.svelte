<script lang="ts">
	import InputList from '$lib/components/input-list.svelte';
	import countries from '$lib/assets/countries.json';
	import { Icon, Save } from 'svelte-hero-icons';
	import { browser } from '$app/environment';
	import type { Modal } from '$stores/modals';
	import { draft } from '$lib/forms';
	import { enhance } from '$app/forms';
	import { formHandler } from '$lib/forms';

	let addingEditor = { name: '', role: '' };
	let addingFunder = { name: '' };
	let addingAuthor = { name: '', role: '' };
	let addingAltIdentifier = { type: '', value: '' };
	const draftTitle = browser ? localStorage.getItem('document-create-title') : undefined;
	const draftModal: Modal = {
		id: 'document-draft',
		title: 'Recuperar rascunho',
		description: `Existe um rascunho da última sessão com o título "${draftTitle}", deseja continuar o trabalho?`,
		actionName: 'Continuar',
		type: 'info'
	};
</script>

<form
	id="document-create"
	action="/documents/create"
	method="POST"
	class="mt-12"
	use:enhance={formHandler()}
	use:draft={draftModal}
>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Título</h3>
			<p class="mt-1 label">
				Agrupa informações sobre o título da obra e os responsáveis pelo seu conteúdo.
			</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-12 ">
					<label for="title" class="label">Título da Obra</label>
					<input
						id="title"
						name="title"
						class="input mt-1"
						type="text"
						placeholder="O Foral Manuelino da Feira e Terra de Santa Maria"
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="editors" class="label">Editores</label>
					<InputList id="editors" bind:addingValues={addingEditor}>
						<span slot="list" let:value>
							<div class="flex flex-col">
								<p class="text-sm font-medium text-stone-900 dark:text-white">{value.name}</p>
								<p class="text-sm text-stone-500 dark:text-stone-300">{value.role}</p>
							</div>
						</span>
						<span slot="inputs" let:handleAdd class="flex gap-6 flex-1">
							<input
								type="text"
								class="input"
								placeholder="Vasco Sousa"
								bind:value={addingEditor.name}
								on:blur={handleAdd}
							/>
							<select class="input" bind:value={addingEditor.role} on:blur={handleAdd}>
								<option disabled value="">Selecionar papel</option>
								<option value="supervisor">Supervisor</option>
								<option value="transcriber">Transcritor</option>
								<option value="encoder">Codificador de Texto</option>
								<option value="annotator">Anotador</option>
								<option value="revisor">Revisor</option>
							</select>
						</span>
					</InputList>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="funders" class="label">Financiadores</label>
					<InputList id="funders" bind:addingValues={addingFunder}>
						<span slot="list" let:value>
							<div class="flex flex-col">
								<p class="text-sm font-medium text-stone-900 dark:text-white">{value.name}</p>
							</div>
						</span>
						<span slot="inputs" let:handleAdd class="flex-1">
							<input
								type="text"
								class="input"
								placeholder="FCT"
								bind:value={addingFunder.name}
								on:blur={handleAdd}
							/>
						</span>
					</InputList>
				</div>
			</div>
		</div>
	</div>
	<div class="py-8">
		<div class="border-t border-stone-300 dark:border-stone-700" />
	</div>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Publicação</h3>
			<p class="mt-1 label">Agrupa informações sobre a publicação digital da obra</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-12 lg:col-span-6">
					<label for="publisher" class="label">Produtor</label>
					<input
						id="publisher"
						name="publisher"
						class="input mt-1"
						type="text"
						placeholder="Universidade de Aveiro"
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="publisherPlace" class="label">Local de Publicação</label>
					<input
						id="publisherPlace"
						name="publisherPlace"
						class="input mt-1"
						type="text"
						placeholder="Aveiro"
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="publisherDate" class="label">Data de Publicação</label>
					<input
						id="publisherDate"
						name="publisherDate"
						class="input mt-1"
						type="date"
						placeholder="Aveiro"
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="license" class="label">Licença</label>
					<input
						id="license"
						name="license"
						class="input mt-1"
						type="text"
						readonly
						value="Creative Commons Attribution-ShareAlike (CC BY-SA)"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="py-8">
		<div class="border-t border-stone-300 dark:border-stone-700" />
	</div>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Descrição da Fonte</h3>
			<p class="mt-1 label">
				Descreve a fonte a partir da qual um texto eletrônico foi derivado ou gerado.
			</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-12 lg:col-span-6">
					<label for="country" class="label">País</label>
					<select id="country" name="country" class="input">
						{#each countries as country}
							<option value={country.code}>{country.name}</option>
						{/each}
					</select>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="institution" class="label">Instituíção</label>
					<input
						id="institution"
						name="institution"
						type="text"
						class="input"
						placeholder="Universidade de Aveiro"
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="settlement" class="label">Local</label>
					<input id="settlement" name="settlement" type="text" class="input" placeholder="Aveiro" />
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="repository" class="label">Repositório</label>
					<input
						id="repository"
						name="repository"
						type="text"
						class="input"
						placeholder="Biblioteca"
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="idno" class="label">IdNo</label>
					<input id="idno" name="idno" type="text" class="input" placeholder="XXXX" />
				</div>

				<div class="col-span-12 lg:col-span-6">
					<label for="originDate" class="label">Data de Origem</label>
					<div class="flex items-center justify-between gap-3">
						<input
							id="originDate"
							name="originDate"
							type="date"
							class="input"
							placeholder="26/01/2000"
						/>
						<span class="text-stone-900 dark:text-stone-300 font-semibold text-lg">-</span>
						<input
							id="originDateEnd"
							name="originDateEnd"
							type="date"
							class="input"
							placeholder="26/01/2000"
						/>
					</div>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="originPlace" class="label">Lugar de Origem</label>
					<input
						id="originPlace"
						name="originPlace"
						type="text"
						class="input"
						placeholder="Aveiro"
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="lang" class="label">Linguagem</label>
					<select id="lang" name="lang" class="input">
						<option value="pt">Português</option>
						<option value="pt-lt">Português / Latim</option>
						<option value="lt-pt">Latim / Português</option>
						<option value="lt">Latim</option>
					</select>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="authors" class="label">Autores</label>
					<InputList id="authors" bind:addingValues={addingAuthor}>
						<span slot="list" let:value>
							<div class="flex flex-col">
								<p class="text-sm font-medium text-stone-900 dark:text-white">{value.name}</p>
								<p class="text-sm text-stone-500 dark:text-stone-300">{value.role}</p>
							</div>
						</span>
						<span slot="inputs" let:handleAdd class="flex gap-6 flex-1">
							<select class="input" bind:value={addingAuthor.role} on:blur={handleAdd}>
								<option value="" disabled selected>Selecionar tipo</option>
								<option value="jurídico">Jurídico</option>
								<option value="material">Material</option>
								<option value="diplomático">Diplomático</option>
							</select>
							<input
								type="text"
								class="input"
								placeholder="D. XYZ"
								bind:value={addingAuthor.name}
								on:blur={handleAdd}
							/>
						</span>
					</InputList>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="editors" class="label">Identificadores Alternativos</label>
					<InputList id="altIdentifier" bind:addingValues={addingAltIdentifier}>
						<span slot="list" let:value>
							<div class="flex flex-col">
								<p class="text-sm font-medium text-stone-900 dark:text-white">{value.type}</p>
								<a href={value.value} class="text-sm text-stone-500 dark:text-stone-300">
									{value.value}
								</a>
							</div>
						</span>
						<span slot="inputs" let:handleAdd class="flex gap-6 flex-1">
							<select class="input" bind:value={addingAltIdentifier.type}>
								<option value="" disabled>Selecionar tipo</option>
								<option value="BITAGAP">BITAGAP</option>
							</select>
							<input
								type="text"
								class="input"
								placeholder="Ref"
								bind:value={addingAltIdentifier.value}
								on:blur={handleAdd}
							/>
						</span>
					</InputList>
				</div>
				<div class="col-span-12">
					<label for="title" class="label">Filiação</label>
					<textarea
						id="filiation"
						name="filiation"
						class="input"
						placeholder="Este foral..."
						rows="6"
					/>
				</div>
				<div class="col-span-12">
					<label for="summary" class="label">Sumário</label>
					<textarea
						id="summary"
						name="summary"
						class="input"
						placeholder="Cópia de foral concedido por D. Afonso I à vila de ..."
						rows="6"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="py-8">
		<div class="border-t border-stone-300 dark:border-stone-700" />
	</div>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Codificação de caracteres</h3>
			<p class="mt-1 label">Descreve a forma como certos caracteres especiais são codificados</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-12">
					<label for="title" class="label">Codificação</label>
					<textarea
						id="encoding"
						name="encoding"
						class="input mt-1"
						placeholder="Neste foral..."
						rows="9"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="py-8">
		<div class="border-t border-stone-300 dark:border-stone-700" />
	</div>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Descrição Física</h3>
			<p class="mt-1 label">Descreve o aspeto do manuscrito original</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-6">
					<label for="objectDesc" class="label">Forma</label>
					<select id="objectDesc" name="objectDesc" class="input">
						<option value="composto">Composto</option>
						<option value="simples">Simples</option>
					</select>
				</div>
				<div class="col-span-6">
					<label for="supportDesc" class="label">Material do suporte</label>
					<select id="supportDesc" name="supportDesc" class="input">
						<option value="perg">Pergaminho</option>
						<option value="paper">Papel</option>
					</select>
				</div>
				<div class="col-span-6">
					<label for="support" class="label">Tipo de suporte</label>
					<input id="support" name="support" type="text" class="input" placeholder="Parchment" />
				</div>
				<div class="col-span-6">
					<label for="extent" class="label">Número de fólios</label>
					<input id="extent" name="extent" type="text" class="input" placeholder="i + 55 leaves" />
				</div>
				<div class="col-span-6">
					<label for="height" class="label">Altura (cm)</label>
					<input id="height" name="height" type="number" class="input" placeholder="10" min={0} />
				</div>
				<div class="col-span-6">
					<label for="width" class="label">Comprimento (cm)</label>
					<input id="width" name="width" type="number" class="input" placeholder="10" min={0} />
				</div>
				<div class="col-span-6">
					<label for="layout" class="label">Disposição</label>
					<input
						id="layout"
						name="layout"
						type="text"
						class="input"
						placeholder="Em duas colunas"
					/>
				</div>
				<div class="col-span-12">
					<label for="title" class="label">Descrição das mãos</label>
					<textarea
						id="handDesc"
						name="handDesc"
						class="input mt-1"
						placeholder="Escrito com mais de uma mão"
						rows="9"
					/>
				</div>
				<div class="col-span-12">
					<label for="title" class="label"> Ornamentação</label>
					<textarea
						id="decoDesc"
						name="decoDesc"
						class="input mt-1"
						placeholder="Com algumas capitalizações coloridas"
						rows="9"
					/>
				</div>
				<div class="col-span-12">
					<label for="title" class="label">Estado de conservação</label>
					<textarea id="condition" name="condition" class="input mt-1" rows="9" />
				</div>
				<div class="col-span-12">
					<label for="title" class="label">Marginalia</label>
					<textarea id="additions" name="additions" class="input mt-1" rows="9" />
				</div>
			</div>
		</div>
	</div>
	<div class="py-8">
		<div class="border-t border-stone-300 dark:border-stone-700" />
	</div>
	<div class="flex justify-end gap-6">
		<button class="btn btn-primary" type="submit">
			<Icon src={Save} solid class="w-5 mr-1" />Guardar
		</button>
	</div>
</form>
