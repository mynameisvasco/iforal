<script lang="ts">
	import { enhance } from '$lib/forms';
	import { Icon, UserAdd } from 'svelte-hero-icons';
</script>

<form action="/users/invite" method="post" use:enhance={{ redirect: '/users' }}>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Detalhes</h3>
			<p class="mt-1 label">Conjunto de informações pertencentes ao utilizador a ser convidado</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-12 lg:col-span-6">
					<label for="name" class="label">Nome</label>
					<input id="name" name="name" class="input mt-1" type="text" placeholder="Vasco Sousa" />
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="email" class="label">Email</label>
					<input id="email" name="email" class="input mt-1" type="email" placeholder="test@ua.pt" />
				</div>
				<div class="col-span-12 lg:col-span-6">
					<label for="role" class="label">Cargo</label>
					<select id="role" name="role" class="input">
						<option disabled selected>Selecionar cargo...</option>
						<option value="Regular">Regular</option>
						<option value="Admin">Admin</option>
					</select>
				</div>
			</div>
		</div>
	</div>

	<div class="py-8">
		<div class="border-t border-stone-300 dark:border-stone-700" />
	</div>
	<div class="flex justify-end gap-6">
		<button class="btn btn-primary" type="submit">
			<Icon src={UserAdd} solid class="w-5 mr-1" /> Convidar
		</button>
	</div>
</form>
