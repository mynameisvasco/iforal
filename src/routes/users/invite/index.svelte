<script>
	import { enhance } from '$lib/client/forms';
	import { Icon, UserAdd } from 'svelte-hero-icons';
	import UserInviteForm from './_user-invite-form.svelte';
</script>

<svelte:head>
	<title>iForal - Convidar utilizador</title>
</svelte:head>

<main>
	<div class="page-body mt-12">
		<form action="/users/invite" method="post" use:enhance={{ redirect: '/users' }}>
			<UserInviteForm />
			<div class="py-8">
				<div class="border-t border-stone-300 dark:border-stone-700" />
			</div>
			<div class="flex justify-end gap-6">
				<button class="btn btn-primary" type="submit">
					<Icon src={UserAdd} solid class="w-5 mr-1" /> Convidar
				</button>
			</div>
		</form>
	</div>
</main>
