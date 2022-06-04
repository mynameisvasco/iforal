<script lang="ts">
	import { goto } from '$app/navigation';
	import { api } from '$lib/util/api';
	import LoginForm from './_login-form.svelte';
	import LoginHeader from './_login-header.svelte';

	async function handleLogin({ detail }: CustomEvent) {
		const { status } = await api.post(fetch, '/api/auth/login', detail);

		if (status === 200) {
			await goto('/documents');
		}
	}
</script>

<div class="min-h-screen flex">
	<div
		class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<LoginHeader />
			<LoginForm on:login={handleLogin} />
		</div>
	</div>

	<div class="hidden lg:block relative w-0 flex-1">
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
			alt=""
		/>
	</div>
</div>
