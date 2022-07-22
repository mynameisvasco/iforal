<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$lib/client/api';
	import TeiEditor from '$lib/client/components/tei-editor/tei-editor.svelte';
	import type { User } from '@prisma/client';
	import { io, Socket } from 'socket.io-client';
	import { onDestroy, onMount } from 'svelte';

	export let body: string;

	const documentId = parseInt($page.params.id);
	let socket: Socket | undefined;

	async function handleAutosave({ detail }: CustomEvent) {
		await api.put(window.fetch, `/documents/${documentId}`, { changes: detail.changes });
	}

	function handleUserJoined(currentUsers: User[]) {
		console.log(currentUsers);
	}

	onMount(() => {
		socket = io('ws://localhost:3000/documents');
		socket.on('joined', (e) => console.log('test'));
		socket.emit('join', { documentId });
	});

	onDestroy(() => {
		socket?.disconnect();
	});
</script>

<TeiEditor value={body} on:autosave={handleAutosave} />
