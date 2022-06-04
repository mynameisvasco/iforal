<script lang="ts">
	import Modal from '$lib/components/modal/modal.svelte';
	import { modals } from '$lib/stores/modals';
</script>

{#each $modals as modal}
	<Modal
		isOpen={modal.isOpen}
		title={modal.title}
		icon={modal.icon}
		actionName={modal.actionName}
		action={modal.action}
	>
		{modal.description}
	</Modal>
{/each}
