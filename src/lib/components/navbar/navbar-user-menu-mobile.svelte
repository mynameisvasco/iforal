<script lang="ts">
	import { enhance } from '$app/forms';
	import { formHandler } from '$lib/forms';
</script>

<div class="flex items-center px-4">
	<div class="flex-shrink-0">
		<img
			class="h-10 w-10 rounded-full"
			src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
			alt=""
		/>
	</div>
	<div class="ml-3">
		<div class="text-base font-medium text-stone-800">Vasco Sousa</div>
	</div>
</div>
<div class="mt-3 space-y-1">
	<a href="/profile" class="dropdown-item"> Perfil </a>
	<form action="/logout" method="POST" use:enhance={formHandler()}>
		<button type="submit" class="dropdown-item"> Sair </button>
	</form>
</div>
