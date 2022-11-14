<script lang="ts">
	import type { Document } from '@prisma/client';
	import { Icon, X, Photograph } from 'svelte-hero-icons';
	import { createTeiViewer, viewerSettings } from '$stores/viewer';
	import { onMount } from 'svelte';
	import { api } from '$lib/api';
	import { notifications } from '$stores/notifications';

	export let viewerIndex: number;

	let document = {} as Document;

	function handleRemoveDocument() {
		viewerSettings.setDocumentId(viewerIndex, null);
	}

	onMount(async () => {
		const documentId = $viewerSettings.viewingDocumentIds[viewerIndex];
		if (documentId) {
			const response = (await api.get<any[]>(window.fetch, `/viewer/${documentId}`)) as any;
			if (!response || !response.document) {
				return notifications.show({
					title: 'Erro',
					message: 'Não foi possível carregar o documento',
					type: 'error'
				});
			}

			document = response.document;
			setTimeout(() =>
				createTeiViewer(document, window.document.getElementById(`viewer-${viewerIndex}`)!)
			);
		}
	});
</script>

<div class="flex flex-col flex-1 max-h-full">
	<div class="flex justify-between mb-4 items-center">
		<h1 class="title-1">{document.title}</h1>
		<div>
			<button class="text-stone-700 dark:text-stone-300">
				<Icon src={Photograph} class="w-5" solid />
			</button>
			<button class="text-stone-700 dark:text-stone-300" on:click={handleRemoveDocument}>
				<Icon src={X} class="w-5" solid />
			</button>
		</div>
	</div>
	<div
		id="viewer-{viewerIndex}"
		class="bg-white dark:bg-stone-800  border border-stone-300 dark:border-stone-700 
			p-4 rounded-md overflow-y-auto leading-loose"
	/>
</div>
