<script lang="ts">
	import RegisterForm from './_register-form.svelte';
	import RegisterHeader from './_register-header.svelte';
</script>

<svelte:head>
	<title>iForal - Criar conta</title>
</svelte:head>

<div class="min-h-screen flex">
	<div
		class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<RegisterHeader />
			<RegisterForm />
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
