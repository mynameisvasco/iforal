<script lang="ts">
	import { editorSettings } from '$lib/client/components/stores/editor-settings';
	import type { Document, DocumentImages, DocumentPermissions, User } from '@prisma/client';
	import DocumentEditMembersSidecover from './_document-edit-members-sidecover.svelte';
	import Gallery from '$lib/client/components/gallery/gallery.svelte';
	import DocumentEditEditor from './_document-edit-editor.svelte';
	import DocumentEditActions from './_document-edit-actions.svelte';

	export let data: Document & { images: DocumentImages[] } & { user: User } & {
		permissions: (DocumentPermissions & { user: User })[];
	};
</script>

<svelte:head>
	<title>iForal - Editor</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">{data.title}</h1>
			<div class="flex items-center gap-3">
				<DocumentEditActions />
				<DocumentEditMembersSidecover creator={data.user} permissions={data.permissions} />
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-{$editorSettings.editorColSize} h-full">
				<DocumentEditEditor body={data.body} />
			</div>
			{#if 12 - $editorSettings.editorColSize != 0}
				<div class="col-span-{12 - ($editorSettings.editorColSize % 12)} h-full">
					<Gallery images={data.images} />
				</div>
			{/if}
		</div>
	</div>
</main>
