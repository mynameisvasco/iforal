<script lang="ts">
	import DocumentCreateForm from './_document-create-form.svelte';
</script>

<svelte:head>
	<title>iForal - Novo documento</title>
</svelte:head>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">Novo Documento</h1>
		</div>
	</div>
</header>
<main>
	<div class="page-body">
		<DocumentCreateForm />
	</div>
</main>
