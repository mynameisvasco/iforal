<script lang="ts">
	import Modal from '$lib/client/components/modal/modal.svelte';
	import { modals } from '$lib/client/modals';
</script>

{#each $modals as modal}
	<Modal
		id={modal.id}
		title={modal.title}
		type={modal.type}
		actionName={modal.actionName}
		onAction={modal.onAction}
		onCancel={modal.onCancel}
	>
		{modal.description}
	</Modal>
{/each}
