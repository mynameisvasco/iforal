<script>
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import '../app.css';
</script>

<div class="min-h-screen bg-stone-100 dark:bg-stone-900">
	<Navbar />
	<div class="py-10 h-full">
		<slot />
	</div>
</div>
