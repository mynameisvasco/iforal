<script lang="ts">
	import DocumentEditMembersSidecover from './_document-edit-members-sidecover.svelte';
	import DocumentEditActions from './_document-edit-actions.svelte';
	import { editorSettings } from '$stores/editor';
	import { viewerSettings } from '$stores/viewer';
	import PageHeader from '$lib/components/page-header.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import type { PageData } from './$types';
	import Editor from '$lib/components/editor/editor.svelte';
	import Viewer from '$lib/components/viewer/viewer.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>iForal - Editor</title>
</svelte:head>

<PageHeader title={data.document.title}>
	<DocumentEditActions />
	<DocumentEditMembersSidecover />
</PageHeader>
<PageBody>
	{#if $viewerSettings.isViewerMode}
		<Viewer />
	{:else if $editorSettings.isEditorMode}
		<Editor body={data.document.body} documentId={data.document.id} tags={data.tags} />
	{/if}
</PageBody>
