<script context="module">
	export let ssr = false;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Gallery from '$lib/components/gallery.svelte';
	import { createViewer, viewerSettings } from '$stores/viewer';
	import { onMount } from 'svelte';
	import ViewerSettingsMenu from './viewer-settings-menu.svelte';

	onMount(() => {
		createViewer(document.getElementById('viewer')!, $page.data.document.body);
	});
</script>

<div class="grid grid-cols-12 gap-6">
	<div
		class="h-full"
		class:col-span-12={$viewerSettings.isFullWidth}
		class:col-span-8={!$viewerSettings.isFullWidth}
	>
		<div
			class="flex items-center justify-end gap-1 w-full bg-stone-50 dark:bg-stone-900 p-1 
		rounded-t-md border border-stone-300 dark:border-stone-700 h-12"
		>
			<ViewerSettingsMenu />
		</div>
		<div
			id="viewer"
			class="h-[750px] bg-white dark:bg-stone-800 border-r border-l border-b rounded-b-md 
			border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-300 p-8 viewer"
			style="font-size: {$viewerSettings.fontSize}px; line-height: 1.55em"
		/>
	</div>
	<div
		class="h-full"
		class:col-span-4={!$viewerSettings.isFullWidth}
		class:hidden={$viewerSettings.isFullWidth}
		style="min-height: 800px;"
	>
		<Gallery images={$page.data.document.images} />
	</div>
</div>
