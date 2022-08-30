<script lang="ts">
	import { enhance } from '$lib/forms';
</script>

<form
	class="space-y-6 mt-8"
	action="/register"
	method="post"
	use:enhance={{ redirect: '/documents' }}
>
	<div>
		<label for="name" class="label"> Nome </label>
		<div class="mt-1">
			<input id="name" name="name" type="text" class="input" />
		</div>
	</div>
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
	<div>
		<button type="submit" class="btn btn-primary w-full justify-center"> Criar </button>
	</div>
</form>
