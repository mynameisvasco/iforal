<script lang="ts">
	import NotfoundScreen from '$lib/client/components/error-screens/notfound-screen.svelte';
	import { page } from '$app/stores';
</script>

{#if $page.status == 404}
	<NotfoundScreen />
{:else}
	<h1>{$page.status}: {$page.error?.message}</h1>
	<span>{$page.error.stack}</span>
{/if}
