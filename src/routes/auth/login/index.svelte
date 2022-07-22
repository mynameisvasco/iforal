<script lang="ts">
	import LoginHeader from './_login-header.svelte';
</script>

<div class="min-h-screen flex">
	<div
		class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<LoginHeader />
			<div class="mt-8">
				<form class="space-y-6" method="post" action="/auth/login">
					<div>
						<label for="email" class="label"> Endereço de Email </label>
						<div class="mt-1">
							<input id="email" name="email" type="text" class="input" />
						</div>
					</div>
					<div>
						<label for="password" class="label"> Password </label>
						<div class="mt-1">
							<input id="password" name="password" type="password" class="input" />
						</div>
					</div>
					<div class="flex items-center justify-between">
						<a href="/forget-password" class="link text-sm" sveltekit:prefetch>
							Esqueci-me da password
						</a>
					</div>
					<div>
						<button type="submit" class="btn btn-primary w-full justify-center"> Entrar </button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div class="hidden lg:block relative w-0 flex-1">
		<img
			class="absolute inset-0 h-full w-full object-cover"
			src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
			alt="test"
		/>
	</div>
</div>
