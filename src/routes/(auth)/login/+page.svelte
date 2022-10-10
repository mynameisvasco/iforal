<script lang="ts">
	import { enhance } from '$app/forms';
	import { formHandler } from '$lib/forms';
	import authImage1 from '$lib/assets/auth-image-1.png';
	import authImage2 from '$lib/assets/auth-image-2.png';
</script>

<svelte:head>
	<title>iForal - Entrar na conta</title>
</svelte:head>

<div class="min-h-screen flex">
	<div
		class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
	>
		<div class="mx-auto w-full max-w-sm lg:w-96">
			<div>
				<div class="text-stone-900 dark:text-white">iForal</div>
				<h2 class="mt-6 text-3xl font-extrabold text-stone-900 dark:text-white">
					Entre na sua conta
				</h2>
				<p class="mt-2 text-sm text-stone-700 dark:text-stone-500">
					Ou
					<a href="/register" class="font-medium text-stone-900 dark:text-orange-300">
						crie a sua agora mesmo
					</a>
				</p>
			</div>
			<form class="space-y-6 mt-8" method="POST" use:enhance={formHandler()}>
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
					<a href="/forget-password" class="link text-sm"> Esqueci-me da password </a>
				</div>
				<div>
					<button type="submit" class="btn btn-primary w-full justify-center"> Entrar </button>
				</div>
			</form>
		</div>
	</div>
	<div class="hidden lg:block relative w-0 flex-1">
		<img class="absolute inset-0 h-full w-full object-cover" src={authImage2} alt="auth-1" />
	</div>
</div>
