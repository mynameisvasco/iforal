<script lang="ts">
	//@ts-ignore
	import countries from '$lib/util/countries.json';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

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
					<label for="title" class="label">País</label>
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
					<label for="title" class="label">Instituíção</label>
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
					<label for="title" class="label">Repositório</label>
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
					<label for="title" class="label">IdNo</label>
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
					<label for="title" class="label">Autor</label>
					<input
						id="author"
						name="author"
						type="text"
						class="input"
						placeholder="Vasco Sousa"
						class:input-error={$errors.author}
						on:change={handleChange}
						bind:value={$form.author}
					/>
					{#if $errors.author}
						<div class="error-label">{$errors.author}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="title" class="label">Data de Origem</label>
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
					<label for="title" class="label">Lugar de Origem</label>
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
			</div>
		</div>
	</div>
</div>
