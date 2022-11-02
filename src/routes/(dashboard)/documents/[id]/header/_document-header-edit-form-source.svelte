<script lang="ts">
	import { page } from '$app/stores';

	import InputList from '$lib/components/input-list.svelte';
	import countries from '$lib/assets/countries.json';
	import { format } from 'date-fns';

	let addingAuthor = { name: '', role: '' };
	let addingAltIdentifier = { type: '', value: '' };
</script>

<div>
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
					<select
						id="country"
						name="country"
						class="input"
						value={$page.data.documentHeader.country}
					>
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
						value={$page.data.documentHeader.institution}
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="settlement" class="label">Local</label>
					<input
						id="settlement"
						name="settlement"
						type="text"
						class="input"
						placeholder="Aveiro"
						value={$page.data.documentHeader.settlement}
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="repository" class="label">Repositório</label>
					<input
						id="repository"
						name="repository"
						type="text"
						class="input"
						placeholder="Biblioteca"
						value={$page.data.documentHeader.repository}
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="idno" class="label">IdNo</label>
					<input
						id="idno"
						name="idno"
						type="text"
						class="input"
						placeholder="XXXX"
						value={$page.data.documentHeader.idno}
					/>
				</div>

				<div class="col-span-12 lg:col-span-6">
					<label for="origindate" class="label">Data de Origem</label>
					<input
						id="originDate"
						name="originDate"
						type="date"
						class="input"
						placeholder="26/01/2000"
						value={format($page.data.documentHeader.publisherDate, 'yyyy-MM-dd')}
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="originPlace" class="label">Lugar de Origem</label>
					<input
						id="originPlace"
						name="originPlace"
						type="text"
						class="input"
						placeholder="Aveiro"
						value={$page.data.documentHeader.originPlace}
					/>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="lang" class="label">Linguagem</label>
					<select
						id="lang"
						name="lang"
						type="text"
						class="input"
						placeholder="Este foral..."
						value={$page.data.documentHeader.lang}
					>
						<option value="pt">Português</option>
						<option value="pt-lt">Português / Latim</option>
						<option value="lt-pt">Latim / Português</option>
						<option value="lt">Latim</option>
					</select>
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="authors" class="label">Autores</label>
					<InputList
						id="authors"
						bind:addingValues={addingAuthor}
						value={$page.data.documentHeader.authors}
					>
						<span slot="list" let:value>
							<div class="flex flex-col">
								<p class="text-sm font-medium text-stone-900 dark:text-white">{value.name}</p>
								<p class="text-sm text-stone-500 dark:text-stone-300">{value.role}</p>
							</div>
						</span>
						<span slot="inputs" let:handleAdd class="flex gap-6 flex-1">
							<select class="input" bind:value={addingAuthor.role} on:blur={handleAdd}>
								<option value="" default disabled selected>Selecionar tipo</option>
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
					<label for="altIdentifier" class="label">Identificadores Alternativos</label>
					<InputList
						id="altIdentifier"
						bind:addingValues={addingAltIdentifier}
						value={$page.data.documentHeader.altIdentifier}
					>
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
								<option value="" disabled default>Selecionar tipo</option>
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
					<label for="filiation" class="label">Filiação</label>
					<textarea
						id="filiation"
						name="filiation"
						type="text"
						class="input"
						placeholder="Este foral..."
						rows="6"
						value={$page.data.documentHeader.filiation}
					/>
				</div>
				<div class="col-span-12">
					<label for="summary" class="label">Sumário</label>
					<textarea
						id="summary"
						name="summary"
						type="text"
						class="input"
						placeholder="Cópia de foral concedido por D. Afonso I à vila de ..."
						rows="6"
						value={$page.data.documentHeader.summary}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
