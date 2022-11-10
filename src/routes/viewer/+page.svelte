<script>
	import DocumentViewerItem from '$lib/components/documents/document-viewer-item.svelte';
	import { viewerSettings } from '$stores/viewer';
</script>

<div
	class="bg-black w-full h-screen grid grid-cols-12 divide-x divide-stone-300 dark:divide-stone-700 overflow-hidden"
>
	<div class="col-span-{12 / $viewerSettings.viewersCount} h-screen">
		<DocumentViewerItem viewerIndex={1} />
	</div>
	{#if $viewerSettings.viewersCount > 1}
		<div class="col-span-{12 / $viewerSettings.viewersCount} h-screen ">
			<DocumentViewerItem viewerIndex={2} />
		</div>
	{/if}
	{#if $viewerSettings.viewersCount > 2}
		<div class="col-span-{12 / $viewerSettings.viewersCount} h-screen ">
			<DocumentViewerItem viewerIndex={3} />
		</div>
	{/if}
</div>
