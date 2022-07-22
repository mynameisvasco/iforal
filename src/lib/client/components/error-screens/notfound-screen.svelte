<script lang="ts">
	import { Exclamation, Home, Icon } from 'svelte-hero-icons';
	import EmptyState from '../empty-state/empty-state.svelte';
</script>

<header class="page-header" />

<main class="page-body">
	<EmptyState
		title="Não encontramos o que procura"
		icon={Exclamation}
		description="O recurso pretendido não se encontra disponível, poderá ter sido apagado"
	>
		<a href="/documents" class="btn btn-primary" sveltekit:prefetch>
			<Icon src={Home} solid class="w-5 mr-1" />
			Voltar
		</a>
	</EmptyState>
</main>
