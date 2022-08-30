<script lang="ts">
	import { enhance } from '$lib/forms';
</script>

<form class="space-y-6 mt-8" method="post" action="/login" use:enhance={{ redirect: '/documents' }}>
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
		<a href="/forget-password" class="link text-sm" data-sveltekit-prefetch>
			Esqueci-me da password
		</a>
	</div>
	<div>
		<button type="submit" class="btn btn-primary w-full justify-center"> Entrar </button>
	</div>
</form>
