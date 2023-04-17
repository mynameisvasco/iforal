<script lang="ts">
	import UserAvatar from '$lib/components/users/user-avatar.svelte';
	import SearchEndpointInput from '$lib/components/search-endpoint-input.svelte';
	import SideCover from '$lib/components/side-cover.svelte';
	import { enhance } from '$app/forms';
	import { Icon, Users } from 'svelte-hero-icons';
	import DocumentPermissionsItem from './document-permissions-item.svelte';
	import { formHandler } from '$lib/forms';
	import { page } from '$app/stores';

	let sideCover: any;
</script>

<SideCover
	title="Membros"
	description="Faça a gestão de quem tem acesso ao documento e que permissões em particular cada um dos membros tem."
	bind:this={sideCover}
>
	<div class="flex flex-col gap-6">
		<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
			{#if $page.data.document.permissions.find((p) => p.userId === $page.data.user.id && p.type >= 1)}
				<SearchEndpointInput
					placeholder="Adicionar membro pelo nome ou email"
					endpoint="/documents/{$page.data.document.id}/permissions/search"
					searchParams={['name', 'email']}
					let:item
				>
					<form
						class="w-full"
						action="/documents/{$page.data.document.id}/permissions?/create"
						method="POST"
						use:enhance={formHandler()}
					>
						<input name="email" id="email" type="hidden" value={item.email} />
						<button type="submit" class="flex items-center gap-3 w-full">
							<UserAvatar name={item.name} size={42} />
							<span class="flex flex-col items-start">
								<span class="text-stone-900 dark:text-white text-sm font-medium">
									{item.name}
								</span>
								<span class="label">{item.email}</span>
							</span>
						</button>
					</form>
				</SearchEndpointInput>
			{/if}
		</div>
		<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
			<DocumentPermissionsItem
				id={0}
				name={$page.data.document.user.name}
				email={$page.data.document.user.email}
				permissionType={2}
			/>
		</div>
		{#each $page.data.document.permissions as permission}
			<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
				<DocumentPermissionsItem
					id={permission.id}
					name={permission.user.name}
					email={permission.user.email}
					permissionType={permission.type}
				/>
			</div>
		{/each}
	</div>
</SideCover>
<button type="button" class="btn btn-primary" on:click={sideCover.toggle}>
	<Icon src={Users} solid class="w-5 mr-1" />
	Membros
</button>
