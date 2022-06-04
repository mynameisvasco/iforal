<script context="module" lang="ts">
	export async function load(context: LoadInput) {
		if (!context.url.pathname.includes('auth') && !context.session.isAuthenticated) {
			return { status: 302, redirect: '/auth/login' };
		}

		return {};
	}
</script>

<script lang="ts">
	import '../app.css';
	import { browser } from '$app/env';
	import { page } from '$app/stores';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import type { LoadInput } from '@sveltejs/kit';
	import ModalContainer from './_modal-container.svelte';

	if (browser && !$page?.url?.pathname?.includes('auth')) {
	}
</script>

<ModalContainer />
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
