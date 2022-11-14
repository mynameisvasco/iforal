<script>
	import { viewerSettings } from '$stores/viewer';
	import { Icon, Plus } from 'svelte-hero-icons';

	function handleAddDocument() {
		if ($viewerSettings.viewingDocumentIds[1] !== -1) {
			viewerSettings.setDocumentId(2, null);
		} else if ($viewerSettings.viewingDocumentIds[0] !== -1) {
			viewerSettings.setDocumentId(1, null);
		}
	}
</script>

{#if $viewerSettings.viewingDocumentIds.filter((v) => v !== -1).length !== 3}
	<button
		class="absolute ml-32 w-12 h-12 bg-stone-900 dark:bg-orange-300 rounded-sm right-0 bottom-[50%]
	 flex items-center justify-center text-white dark:text-stone-900 cursor-pointer z-10"
		on:click={handleAddDocument}
	>
		<Icon src={Plus} class="w-8" solid />
	</button>
{/if}
