<script lang="ts">
	import EmptyState from '$lib/components/empty-state.svelte';
	import GlossaryIndex from '$lib/components/glossary/glossary-index.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import { DocumentAdd } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import { format as formatDate } from 'date-fns';
	import pt from 'date-fns/locale/pt';

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
					<div class="col-span-12 lg:col-span-6 flex flex-col gap-3">
						<div class="flex flex-col">
							<span class="label">Lema</span>
							<span class="text-stone-900 dark:text-white font-semibold">
								{glossaryEntry.lemma} / {glossaryEntry.actualLema}
							</span>
							<span class="text-xs text-stone-700 dark:text-stone-300">
								({glossaryEntry.category})
							</span>
						</div>
					</div>
					<div class="col-span-12 lg:col-span-6 flex flex-col">
						<div class="label">Traduções</div>
						{#each glossaryEntry.translations as translation}
							<div class="flex flex-col mb-2">
								<span class="text-stone-900 dark:text-white font-semibold">
									{translation.value}
								</span>
								<span class="text-stone-500 dark:text-stone-300 text-sm">
									{translation.language}
								</span>
							</div>
						{:else}
							<span>-</span>
						{/each}
					</div>
					<div class="col-span-12 lg:col-span-6 flex flex-col">
						<div class="flex flex-col">
							<span class="label">Definição</span>
							<span class="text-stone-900 dark:text-white">
								{glossaryEntry.definition}
							</span>
						</div>
					</div>
					<div class="col-span-12 lg:col-span-6 flex flex-col">
						<div class="label">Formas e Contextos</div>
						{#each data.glossaryEntries.filter((e) => e.lemma === lemma) as otherGlossaryEntry}
							<div class="flex flex-col mb-2">
								<span class="text-stone-900 dark:text-white font-semibold">
									{otherGlossaryEntry.actual}
								</span>
								<span class="text-stone-500 dark:text-stone-300 text-sm">
									{otherGlossaryEntry.context}
									[{otherGlossaryEntry.document.header.title}
									{formatDate(new Date(otherGlossaryEntry.document.header.originDate), 'yyyy')}]
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
