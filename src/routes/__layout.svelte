<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import ModalContainer from './_modal-container.svelte';
	import NotificationsContainer from './_notifications-container.svelte';
</script>

<svelte:head>
	<script>
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<ModalContainer />
<NotificationsContainer />
{#if $page.url.pathname.includes('auth')}
	<div class="bg-stone-100 dark:bg-stone-900 min-h-screen">
		<slot />
	</div>
{:else}
	<div class="bg-stone-100 dark:bg-stone-900 min-h-screen">
		<Navbar />
		<slot />
	</div>
{/if}
