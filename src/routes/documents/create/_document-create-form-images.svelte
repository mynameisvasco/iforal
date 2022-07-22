<script lang="ts">
	import DragDropUpload from '$lib/client/components/drag-drop-upload/drag-drop-upload.svelte';

	export let images: File[] = [];
</script>

<div>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Imagens</h3>
			<p class="mt-1 label">Representam a versão fac-símile da obra em questão</p>
		</div>
		<div class="col-span-2 mt-6 lg:mt-0">
			<DragDropUpload bind:files={images} />
		</div>
	</div>
</div>
