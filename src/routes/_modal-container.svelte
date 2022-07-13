<script lang="ts">
	import Modal from '$lib/components/modal/modal.svelte';
	import { modals } from '$lib/components/stores/modals';
</script>

{#each $modals as modal}
	<Modal
		id={modal.id}
		title={modal.title}
		icon={modal.icon}
		action={modal.action}
		actionName={modal.actionName}
		actionColor={modal.actionColor}
	>
		{modal.description}
	</Modal>
{/each}
