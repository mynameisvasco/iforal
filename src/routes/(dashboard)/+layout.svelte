<script lang="ts">
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import ModalContainer from '$lib/components/modal-container.svelte';
</script>

<ModalContainer />
<div class="bg-stone-100 dark:bg-stone-900 min-h-screen">
	<Navbar />
	<div class="px-4 xl:px-16 pt-6">
		<Breadcrumb />
	</div>
	<slot />
</div>
