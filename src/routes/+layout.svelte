<script lang="ts">
	import '../app.css';
	import NotificationsContainer from '$lib/components/notifications/notifications-container.svelte';
	import { updated } from '$app/stores';

	updated.subscribe(async (value) => {
		if (value) {
			window?.location.reload();
		}
	});
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

<div data-sveltekit-preload-data="hover">
	<NotificationsContainer />
	<slot />
</div>
