<script lang="ts">
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import Editor from '$lib/components/editor/editor.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import DocumentActions from '$lib/components/documents/document-actions.svelte';
	import { ChevronDown, Icon } from 'svelte-hero-icons';
	import type { PageData } from './$types';
	import DocumentPermissionsSidecover from '$lib/components/documents/document-permissions-sidecover.svelte';
	import { editorSettings } from '$stores/editor';
	import Viewer from '$lib/components/viewer/viewer.svelte';
	import DocumentsViewSearchSidecover from '$lib/components/documents/documents-view-search-sidecover.svelte';
	import Gallery from '$lib/components/gallery.svelte';
	import DocumentWordsSidecover from '$lib/components/documents/document-words-sidecover.svelte';

	export let data: PageData;

	let documentsToCompare: any[] = [];
	setContext('body', writable(data.document.body));

	function handleCompareDocument({ detail }: CustomEvent) {
		documentsToCompare = [
			...documentsToCompare,
			data.documentsToCompare.find((document) => document.id === detail.documentId)
		];
	}

	function handleCompareDocumentClose({ detail }: CustomEvent) {
		documentsToCompare = documentsToCompare.filter((document) => document.id !== detail.documentId);
	}
</script>

<svelte:head>
	<title>iForal - Editor</title>
</svelte:head>

<PageHeader title={data.document.title}>
	<DocumentActions id={data.document.id}>
		<button type="button" class="btn btn-secondary flex items-center">
			Ações <Icon src={ChevronDown} class="w-4 ml-1" />
		</button>
	</DocumentActions>
	<DocumentsViewSearchSidecover on:select={handleCompareDocument} />
	<DocumentWordsSidecover />
	<DocumentPermissionsSidecover />
</PageHeader>
<PageBody>
	<div class="grid grid-cols-12 gap-6">
		{#if $editorSettings.isPreviewMode}
			<div
				class:col-span-8={documentsToCompare.length === 0}
				class:col-span-4={documentsToCompare.length > 0}
			>
				<Viewer
					images={data.document.images}
					body={data.document.body}
					documentId={data.document.id}
				/>
			</div>
			{#each documentsToCompare as documentToCompare}
				<div
					class:col-span-8={documentsToCompare.length === 0}
					class:col-span-4={documentsToCompare.length > 0}
				>
					<Viewer
						images={data.document.images}
						body={documentToCompare.body}
						documentId={documentToCompare.id}
						on:close={handleCompareDocumentClose}
					/>
				</div>
			{/each}
			<div
				class="h-full col-span-4"
				style="min-height: 800px;"
				class:hidden={documentsToCompare.length === 2}
			>
				<Gallery images={data.document.images} />
			</div>
		{:else}
			<div
				class:col-span-12={$editorSettings.isFullWidth}
				class:col-span-8={!$editorSettings.isFullWidth}
			>
				<Editor />
			</div>
			<div
				class="h-full col-span-4"
				style="min-height: 800px;"
				class:hidden={$editorSettings.isFullWidth}
			>
				<Gallery images={data.document.images} />
			</div>
		{/if}
	</div>
</PageBody>
