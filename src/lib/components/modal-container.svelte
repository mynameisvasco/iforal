<script lang="ts">
	import Modal from '$lib/components/modal.svelte';
	import { modals } from '$stores/modals';
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
