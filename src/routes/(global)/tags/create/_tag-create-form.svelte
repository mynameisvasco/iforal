<script lang="ts">
	import InputList from '$lib/client/components/input-list/input-list.svelte';

	let addingAttribute: { name: string; values: string } = { name: '', values: '' };
</script>

<div class="md:grid md:grid-cols-3 md:gap-6">
	<div class="md:col-span-1">
		<h3 class="title-2">Detalhes</h3>
		<p class="mt-1 label">Conjunto de informações que caracteriza o marcador em questão</p>
	</div>
	<div class="mt-5 md:mt-0 md:col-span-2">
		<div class="grid grid-cols-12 gap-6 card p-6">
			<div class="col-span-12 lg:col-span-6">
				<label for="name" class="label">Nome</label>
				<input id="name" name="name" class="input mt-1" type="text" placeholder="pb" />
			</div>
			<div class="col-span-12 lg:col-span-6">
				<label for="friendlyName" class="label">Nome Amigável</label>
				<input
					id="friendlyName"
					name="friendlyName"
					class="input mt-1"
					type="text"
					placeholder="Início de Página"
				/>
			</div>
			<div class="col-span-12 lg:col-span-6">
				<label for="category" class="label">Categoria</label>
				<input
					id="category"
					name="category"
					class="input mt-1"
					type="text"
					placeholder="Estrutura"
				/>
			</div>
			<div class="col-span-12 lg:col-span-6 mt-6">
				<div class="relative flex items-start">
					<div class="flex items-center h-5">
						<input
							id="isChildAllowed"
							name="isChildAllowed"
							type="checkbox"
							checked={false}
							class="focus:ring-stone-900 dark:focus:ring-orange-300 h-4 w-4 
                text-stone-600 border-stone-300 dark:border-stone-700 rounded dark:bg-stone-800"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="isChildAllowed" class="label">Contém filho?</label>
						<p class="text-stone-500">Um filho é um marcador que existe dentro de outro.</p>
					</div>
				</div>
			</div>
			<div class="col-span-12">
				<label for="attributes" class="label">Atributos</label>
				<InputList id="attributes" bind:addingValues={addingAttribute}>
					<span slot="list" let:value>
						<p class="text-sm font-medium text-stone-900 dark:text-white">{value.name}</p>
						<p class="text-sm text-stone-500 dark:text-stone-300">{value.values}</p>
					</span>
					<span slot="inputs" class="flex w-full gap-6" let:handleAdd>
						<input
							type="text"
							placeholder="n"
							class="input"
							bind:value={addingAttribute.name}
							on:blur={handleAdd}
						/>
						<input
							type="text"
							placeholder="cancelled,damaged,..."
							class="input"
							bind:value={addingAttribute.values}
							on:blur={handleAdd}
						/>
					</span>
				</InputList>
			</div>
		</div>
	</div>
</div>
