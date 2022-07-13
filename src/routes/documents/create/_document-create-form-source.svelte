<script lang="ts">
	import InputList from '$lib/components/input-list/input-list.svelte';

	//@ts-ignore
	import countries from '$lib/util/countries.json';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let addingAuthor = { name: '', role: '' };
	let addingAltIdentifier = { type: '', value: '' };
	const form = getContext<Writable<any>>('form');
	const errors = getContext<Writable<any>>('errors');
	const handleChange = getContext<(e: any) => any>('handleChange');
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
						class:input-error={$errors.country}
						bind:value={$form.country}
						on:change={handleChange}
					>
						{#each countries as country}
							<option value={country.code}>{country.name}</option>
						{/each}
					</select>
					{#if $errors.country}
						<div class="error-label">{$errors.country}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="institution" class="label">Instituíção</label>
					<input
						id="institution"
						name="institution"
						type="text"
						class="input"
						placeholder="Universidade de Aveiro"
						class:input-error={$errors.institution}
						on:change={handleChange}
						bind:value={$form.institution}
					/>
					{#if $errors.institution}
						<div class="error-label">{$errors.institution}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="settlement" class="label">Local</label>
					<input
						id="settlement"
						name="settlement"
						type="text"
						class="input"
						placeholder="Aveiro"
						class:input-error={$errors.settlement}
						on:change={handleChange}
						bind:value={$form.settlement}
					/>
					{#if $errors.institution}
						<div class="error-label">{$errors.institution}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="repository" class="label">Repositório</label>
					<input
						id="repository"
						name="repository"
						type="text"
						class="input"
						placeholder="Biblioteca"
						class:input-error={$errors.repository}
						on:change={handleChange}
						bind:value={$form.repository}
					/>
					{#if $errors.repository}
						<div class="error-label">{$errors.repository}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="idno" class="label">IdNo</label>
					<input
						id="idno"
						name="idno"
						type="text"
						class="input"
						placeholder="XXXX"
						class:input-error={$errors.idno}
						on:change={handleChange}
						bind:value={$form.idno}
					/>
					{#if $errors.idno}
						<div class="error-label">{$errors.idno}</div>
					{/if}
				</div>

				<div class="col-span-12 lg:col-span-6">
					<label for="origindate" class="label">Data de Origem</label>
					<input
						id="originDate"
						name="originDate"
						type="date"
						class="input"
						placeholder="26/01/2000"
						class:input-error={$errors.originDate}
						on:change={handleChange}
						bind:value={$form.originDate}
					/>
					{#if $errors.originDate}
						<div class="error-label">{$errors.originDate}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="originPlace" class="label">Lugar de Origem</label>
					<input
						id="originPlace"
						name="originPlace"
						type="text"
						class="input"
						placeholder="Aveiro"
						class:input-error={$errors.originPlace}
						on:change={handleChange}
						bind:value={$form.originPlace}
					/>
					{#if $errors.originPlace}
						<div class="error-label">{$errors.originPlace}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="lang" class="label">Linguagem</label>
					<select
						id="lang"
						name="lang"
						type="text"
						class="input"
						placeholder="Este foral..."
						class:input-error={$errors.lang}
						on:change={handleChange}
						bind:value={$form.lang}
					>
						<option value="pt">Português</option>
						<option value="pt-lt">Português / Latin</option>
						<option value="lt-pt">Latin / Português</option>
					</select>
					{#if $errors.filliation}
						<div class="error-label">{$errors.filliation}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="authors" class="label">Autores</label>
					<InputList bind:values={$form.authors} bind:addingValues={addingAuthor}>
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
					{#if $errors.author}
						<div class="error-label">{$errors.author}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="editors" class="label">Identificadores Alternativos</label>
					<InputList bind:values={$form.altIdentifier} bind:addingValues={addingAltIdentifier}>
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
					<label for="title" class="label">Filiação</label>
					<textarea
						id="filliation"
						name="filliation"
						type="text"
						class="input"
						placeholder="Este foral..."
						class:input-error={$errors.filliation}
						rows="6"
						on:change={handleChange}
						bind:value={$form.filliation}
					/>
					{#if $errors.filliation}
						<div class="error-label">{$errors.filliation}</div>
					{/if}
				</div>
				<div class="col-span-12">
					<label for="summary" class="label">Sumário</label>
					<textarea
						id="summary"
						name="summary"
						type="text"
						class="input"
						placeholder="Cópia de foral concedido por D. Afonso I à vila de ..."
						class:input-error={$errors.summary}
						rows="6"
						on:change={handleChange}
						bind:value={$form.summary}
					/>
					{#if $errors.summary}
						<div class="error-label">{$errors.summary}</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
