<script lang="ts">
	import InputList from '$lib/client/components/input-list/input-list.svelte';

	let addingEditor = { name: '', role: '' };
	let addingFunder = { name: '' };
</script>

<div>
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
								<option default disabled value="">Selecionar papel</option>
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
</div>
