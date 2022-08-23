<script lang="ts">
	import DocumentEditMembersSidecover from './_document-edit-members-sidecover.svelte';
	import Gallery from '$lib/client/components/gallery/gallery.svelte';
	import DocumentEditEditor from './_document-edit-editor.svelte';
	import DocumentEditActions from './_document-edit-actions.svelte';
	import { editorSettings } from '$lib/client/editor';

	export let data: any;
</script>

<svelte:head>
	<title>iForal - Editor</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">{data.document.title}</h1>
			<div class="flex items-center gap-3">
				<DocumentEditActions />
				<DocumentEditMembersSidecover
					creator={data.document.user}
					permissions={data.document.permissions}
				/>
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<div class="grid grid-cols-12 gap-6">
			<div
				class="h-full"
				class:col-span-12={$editorSettings.isFullWidth}
				class:col-span-8={!$editorSettings.isFullWidth}
			>
				<DocumentEditEditor body={data.document.body} />
			</div>

			{#if !$editorSettings.isFullWidth}
				<div class="h-full col-span-4">
					<Gallery images={data.document.images} />
				</div>
			{/if}
		</div>
	</div>
</main>
