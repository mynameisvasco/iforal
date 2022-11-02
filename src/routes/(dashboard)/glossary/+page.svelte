<script lang="ts">
	import EmptyState from '$lib/components/empty-state.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import PageHeader from '$lib/components/page-header.svelte';
	import { DocumentAdd, ViewList } from 'svelte-hero-icons';
</script>

<svelte:head>
	<title>iForal - Glossário</title>
</svelte:head>

<PageHeader title="Glossário">
	<input type="text" class="input !w-96" placeholder="Procurar..." />
</PageHeader>
<PageBody>
	<div class="grid grid-cols-12 gap-6">
		<div class="col-span-12">
			<EmptyState
				title="Não existem entradas no glossário"
				description="Ainda não foram marcadas palavras como entradas do glossário"
				icon={ViewList}
			/>
		</div>
	</div>
</PageBody>
