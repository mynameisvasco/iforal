<script lang="ts">
	import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui';
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
	<a
		href="/profile"
		class="block px-4 py-2 text-base font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100"
	>
		Perfil
	</a>

	<a
		href="/logout"
		class="block px-4 py-2 text-base font-medium text-stone-500 hover:text-stone-800 hover:bg-stone-100"
	>
		Sair
	</a>
</div>
