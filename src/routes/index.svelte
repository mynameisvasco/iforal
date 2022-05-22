<script>
	import DocumentOverview from '$lib/components/document/document-overview.svelte';
</script>

<svelte:head>
	<title>iForal - Documentos Recentes</title>
</svelte:head>

<header>
	<div class="page-header">
		<h1 class="title-1">Documentos Recentes</h1>
	</div>
</header>
<main>
	<div class="page-body">
		<div class="grid grid-cols-12 gap-6">
			<div class="col-span-6 md:col-span-4 lg:col-span-3 2xl:col-span-2">
				<DocumentOverview
					title="Foral de XYZ"
					coverUrl="https://www.livrariaferreira.pt/wp-content/uploads/2019/06/21589.jpg"
				/>
			</div>
		</div>
	</div>
</main>
