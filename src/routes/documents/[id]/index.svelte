<script lang="ts">
	import TeiEditor from '$lib/components/tei-editor/tei-editor.svelte';
	import { editorSettings } from '$lib/components/stores/editor-settings';
	import type { Document, DocumentImages, DocumentPermissions, User } from '@prisma/client';
	import DocumentEditSetttingsSidecover from './_document-edit-setttings-sidecover.svelte';
	import DocumentEditMembersSidecover from './_document-edit-members-sidecover.svelte';
	import { Icon, Users } from 'svelte-hero-icons';
	import Gallery from '$lib/components/gallery/gallery.svelte';
	import DocumentEditMenu from './_document-edit-menu.svelte';
	import DocumentEditActions from './_document-edit-actions.svelte';

	export let data: Document & { images: DocumentImages[] } & { user: User } & {
		permissions: (DocumentPermissions & { user: User })[];
	};

	let editorSettingsSideCover: any;
	let editMembersSideCover: any;

	$: document = data;
</script>

<svelte:head>
	<title>iForal - Editor</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<DocumentEditMenu />
			<DocumentEditSetttingsSidecover bind:sideCover={editorSettingsSideCover} />
			<DocumentEditMembersSidecover
				bind:sideCover={editMembersSideCover}
				creator={document.user}
				permissions={document.permissions}
			/>
			<div class="flex items-center gap-3">
				<DocumentEditActions {editorSettingsSideCover} />
				<button class="btn btn-primary" on:click={editMembersSideCover.toggle}>
					<Icon src={Users} solid class="w-5 mr-1" />
					Membros
				</button>
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-{$editorSettings.editorColSize} h-full">
				<TeiEditor />
			</div>
			{#if 12 - $editorSettings.editorColSize != 0}
				<div class="col-span-{12 - ($editorSettings.editorColSize % 12)} h-full">
					<Gallery images={document.images} />
				</div>
			{/if}
		</div>
	</div>
</main>
