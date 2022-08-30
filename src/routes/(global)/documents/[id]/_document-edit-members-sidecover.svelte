<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$lib/api';
	import Avatar from '$lib/components/avatar.svelte';
	import SearchEndpointInput from '$lib/components/search-endpoint-input.svelte';
	import SideCover from '$lib/components/side-cover.svelte';
	import { enhance } from '$lib/forms';
	import { Icon, Users } from 'svelte-hero-icons';
	import DocumentEditorMembersSidecoverItem from './_document-edit-members-sidecover-item.svelte';

	let sideCover: any;

	async function handlePermissionChange(id: number, type: number) {
		await api.put(fetch, `/documents/${$page.data.document.id}/permissions/${id}`, { type });
	}
</script>

<SideCover
	title="Membros"
	description="Faça a gestão de quem tem acesso ao documento e que permissões em particular cada um dos membros tem."
	bind:this={sideCover}
>
	<div class="flex flex-col gap-6">
		<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
			<SearchEndpointInput
				placeholder="Adicionar membro pelo nome ou email"
				endpoint="/users/search"
				searchParams={['name', 'email']}
				let:item
			>
				<form action="/documents/{$page.data.document.id}/permissions" method="POST" use:enhance>
					<input name="email" id="email" type="hidden" value={item.email} />
					<button type="submit" class="flex items-center gap-3 w-full">
						<Avatar name={item.name} size={42} />
						<span class="flex flex-col items-start">
							<span class="text-stone-900 dark:text-white text-sm font-medium">
								{item.name}
							</span>
							<span class="label">{item.email}</span>
						</span>
					</button>
				</form>
			</SearchEndpointInput>
		</div>
		<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
			<DocumentEditorMembersSidecoverItem
				id={0}
				name={$page.data.document.user.name}
				email={$page.data.document.user.email}
				permissionType={2}
			/>
		</div>
		{#each $page.data.document.permissions as permission}
			<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
				<DocumentEditorMembersSidecoverItem
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
