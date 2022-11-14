<script lang="ts">
	import DocumentViewerForm from '$lib/components/documents/document-viewer-form.svelte';
	import DocumentViewerItem from '$lib/components/documents/document-viewer-item.svelte';
	import DocumentViewerPlusIcon from '$lib/components/documents/document-viewer-plus-icon.svelte';
	import { viewerSettings } from '$stores/viewer';

	$: colSize = 12 / $viewerSettings.viewingDocumentIds.filter((v) => v !== -1).length;
</script>

<DocumentViewerPlusIcon />
<div
	class="flex bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-300
		 py-6 divide-x divide-stone-300 dark:divide-stone-700 h-screen"
>
	<div class="px-6 flex-1">
		{#if $viewerSettings.viewingDocumentIds[0]}
			<DocumentViewerItem viewerIndex={0} />
		{:else}
			<DocumentViewerForm formIndex={0} />
		{/if}
	</div>
	{#if $viewerSettings.viewingDocumentIds[1] !== -1}
		<div class="px-6 flex-1">
			{#if $viewerSettings.viewingDocumentIds[1]}
				<DocumentViewerItem viewerIndex={1} />
			{:else}
				<DocumentViewerForm formIndex={1} />
			{/if}
		</div>
	{/if}
	{#if $viewerSettings.viewingDocumentIds[2] !== -1}
		<div class="px-6 flex-1">
			{#if $viewerSettings.viewingDocumentIds[2]}
				<DocumentViewerItem viewerIndex={2} />
			{:else}
				<DocumentViewerForm formIndex={2} />
			{/if}
		</div>
	{/if}
</div>
