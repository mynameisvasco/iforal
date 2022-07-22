<script context="module" lang="ts">
	export function load(event: LoadEvent) {
		return {
			props: {
				error: event.error,
				status: event.status
			}
		};
	}
</script>

<script lang="ts">
	import NotfoundScreen from '$lib/client/components/error-screens/notfound-screen.svelte';
	import type { LoadEvent } from '@sveltejs/kit';

	export let status: number;
	export let error: string;
</script>

{#if status == 404}
	<NotfoundScreen />
{:else}
	{status}
	{error}
{/if}
