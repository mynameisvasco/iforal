<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$lib/client/api';
	import TeiEditor from '$lib/client/components/tei-editor/tei-editor.svelte';
	import { io } from 'socket.io-client';
	import { onMount } from 'svelte';

	export let body: string;
	const documentId = parseInt($page.params.id);

	async function handleAutosave({ detail }: CustomEvent) {
		await api.put(window.fetch, `/documents/${documentId}`, { changes: detail.changes });
	}

	onMount(() => {
		io('ws://localhost:3000/documents', { reconnection: false });
	});
</script>

<TeiEditor value={body} on:autosave={handleAutosave} />
