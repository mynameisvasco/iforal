<script lang="ts">
	import EmptyState from '$lib/components/empty-state.svelte';
	import GlossaryIndex from '$lib/components/glossary/glossary-index.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import { DocumentAdd } from 'svelte-hero-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageHeader title="Glossário">
	<GlossaryIndex />
	<input type="text" placeholder="Pesquisar palavra..." class="input ml-3" />
</PageHeader>
<PageBody>
	<div class="flex flex-col gap-8">
		{#each Array.from(new Set(data.glossaryEntries.map((e) => e.lemma))) as lemma}
			{@const glossaryEntry = data.glossaryEntries.find((e) => e.lemma === lemma)}
			{#if glossaryEntry}
				<div class="grid grid-cols-12 justify-between card p-6 gap-4">
					<div class="col-span-12 lg:col-span-4 flex flex-col gap-3">
						<div class="flex flex-col">
							<span class="label">Lema</span>
							<span class="text-stone-900 dark:text-white font-semibold text-xl">
								&#x2022; {glossaryEntry.lemma} / {glossaryEntry.actualLema}
							</span>
							<span class="text-xs text-stone-700 dark:text-stone-300">
								({glossaryEntry.category})
							</span>
						</div>
						<div class="flex flex-col">
							<span class="label">Definição</span>
							<span class="text-stone-900 dark:text-white text-sm">
								{glossaryEntry.definition}
							</span>
						</div>
					</div>
					<div class="col-span-12 lg:col-span-8 flex flex-col">
						<div class="label">Formas e Contextos</div>
						{#each data.glossaryEntries.filter((e) => e.lemma === lemma) as otherGlossaryEntries}
							<div class="flex flex-col mb-2">
								<span class="text-stone-900 dark:text-white text-sm font-semibold">
									{otherGlossaryEntries.actual}
								</span>
								<span class="text-stone-500 dark:text-stone-300 text-sm">
									{otherGlossaryEntries.context}
								</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{:else}
			<div class="col-span-12">
				<EmptyState
					title="Não existem entradas"
					description="Ainda não adicionou nenhuma entrada a página do glossário"
					icon={DocumentAdd}
				/>
			</div>
		{/each}
	</div>
</PageBody>
