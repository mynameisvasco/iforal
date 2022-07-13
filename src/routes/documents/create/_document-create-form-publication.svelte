<script lang="ts">
	import InputList from '$lib/components/input-list/input-list.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const form = getContext<Writable<any>>('form');
	const errors = getContext<Writable<any>>('errors');
	const handleChange = getContext<(e: any) => any>('handleChange');
</script>

<div>
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
						class:input-error={$errors.publisher}
						bind:value={$form.publisher}
						on:change={handleChange}
					/>
					{#if $errors.publisher}
						<div class="error-label">{$errors.publisher}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="publisherPlace" class="label">Local de Publicação</label>
					<input
						id="publisherPlace"
						name="publisherPlace"
						class="input mt-1"
						type="text"
						placeholder="Aveiro"
						class:input-error={$errors.publisherPlace}
						bind:value={$form.publisherPlace}
						on:change={handleChange}
					/>
					{#if $errors.publisherPlace}
						<div class="error-label">{$errors.publisherPlace}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="publisherDate" class="label">Data de Publicação</label>
					<input
						id="publisherDate"
						name="publisherDate"
						class="input mt-1"
						type="date"
						placeholder="Aveiro"
						class:input-error={$errors.publisherDate}
						bind:value={$form.publisherDate}
						on:change={handleChange}
					/>
					{#if $errors.publisherDate}
						<div class="error-label">{$errors.publisherDate}</div>
					{/if}
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="license" class="label">Licença</label>
					<input
						id="license"
						name="license"
						class="input mt-1"
						type="text"
						placeholder="Aveiro"
						class:input-error={$errors.license}
						disabled={true}
						bind:value={$form.license}
						on:change={handleChange}
					/>
					{#if $errors.license}
						<div class="error-label">{$errors.license}</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
