<script lang="ts">
	import TeiEditor from '$lib/components/tei-editor/tei-editor.svelte';
	import { editorSettings } from '$lib/stores/editor-settings';
	import EditorDocumentActions from './_editor-document-actions.svelte';
	import EditorSetttings from './_editor-setttings.svelte';
</script>

<svelte:head>
	<title>iForal - Editor</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Sample foral</h1>
			<div class="flex gap-3">
				<EditorSetttings />
				<EditorDocumentActions />
			</div>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-{$editorSettings.editorColSize}">
				<TeiEditor />
			</div>
		</div>
	</div>
</main>
