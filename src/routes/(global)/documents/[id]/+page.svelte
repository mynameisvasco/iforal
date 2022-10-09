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

	export let data: PageData;
	setContext('body', writable(data.document.body));
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
	<DocumentPermissionsSidecover
		id={data.document.id}
		owner={data.document.user}
		permissions={data.document.permissions}
	/>
</PageHeader>
<PageBody>
	<Editor
		documentId={data.document.id}
		images={data.document.images}
		body={data.document.body}
		tags={data.tags}
	/>
</PageBody>
