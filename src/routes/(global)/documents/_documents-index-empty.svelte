<script>
	import EmptyState from '$lib/client/components/empty-state/empty-state.svelte';
	import { DocumentAdd, Icon, Plus } from 'svelte-hero-icons';
</script>

<EmptyState
	title="Não existem documentos"
	description="Ainda não criou nem faz parte da edição de nenhum documento"
	icon={DocumentAdd}
>
	<a href="/documents/create" class="btn btn-primary" sveltekit:prefetch>
		<Icon src={Plus} class="w-5 mr-1" solid />
		Documento
	</a>
</EmptyState>
