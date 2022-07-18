<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import ModalContainer from './_modal-container.svelte';
	import NotificationsContainer from './_notifications-container.svelte';
	import Breadcrumb from '$lib/components/breadcrumb/breadcrumb.svelte';
</script>

<svelte:head>
	<script>
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>

	<meta name="theme-color" content="white" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="rgb(41, 37, 36)" media="(prefers-color-scheme: dark)" />
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
		<div class="px-4 xl:px-20 2xl:px-32 pt-6">
			<Breadcrumb />
		</div>
		<slot />
	</div>
{/if}
