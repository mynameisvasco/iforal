<script>
	import { page } from '$app/stores';

	import PageBody from '$lib/components/page-body.svelte';
</script>

<svelte:head>
	<title>iForal - Perfil</title>
</svelte:head>

<PageBody>
	<div class="md:grid md:grid-cols-3 md:gap-6 mt-12">
		<div class="md:col-span-1">
			<h3 class="title-2">Alterar password</h3>
			<p class="mt-1 label">Permite alterar a password de acesso à plataforma</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-6 ">
					<label for="password" class="label">Password</label>
					<input id="password" name="password" class="input mt-1" type="password" />
				</div>
				<div class="col-span-6 ">
					<label for="confirmPassword" class="label">Confirmação da password</label>
					<input id="confirmPassword" name="confirmPassword" class="input mt-1" type="password" />
				</div>
			</div>
		</div>
	</div>
</PageBody>
