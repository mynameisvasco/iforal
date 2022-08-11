<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$lib/client/api';
	import Avatar from '$lib/client/components/avatar/avatar.svelte';
	import SearchEndpointInput from '$lib/client/components/search-endpoint-input/search-endpoint-input.svelte';
	import SideCover from '$lib/client/components/side-cover/side-cover.svelte';
	import type { DocumentPermissions, User } from '@prisma/client';
	import { Icon, Users } from 'svelte-hero-icons';
	import DocumentEditorMembersItem from './_document-edit-members-item.svelte';

	export let creator: User;
	export let permissions: (DocumentPermissions & { user: User })[] = [];

	const documentId = parseInt($page.params.id);
	let sideCover: any;

	async function handlePermissionChange(id: number, type: number) {
		await api.put(fetch, `/documents/${documentId}/permissions/${id}`, { type });
		permissions = permissions.map((p) => (p.id === id ? { ...p, type } : p));
	}

	async function handlePermissionAdd(email: number) {
		const { data } = await api.post(fetch, `/documents/${documentId}/permissions`, {
			documentId,
			email
		});

		permissions = [...permissions, data as any];
	}

	async function handlePermissionRemove(id: number) {
		await api.delete(fetch, `/documents/${documentId}/permissions/${id}`);
		permissions = permissions.filter((p) => p.id !== id);
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
				on:selected={({ detail }) => handlePermissionAdd(detail.item.email)}
				let:item
			>
				{@const hasPermissionsAlready =
					creator.email === item.email || permissions.map((p) => p.user.email).includes(item.email)}
				<div
					class="flex items-center justify-between w-full"
					class:opacity-50={hasPermissionsAlready}
					class:cursor-not-allowed={hasPermissionsAlready}
				>
					<div class="flex gap-3">
						<Avatar name={item.name} size={42} />
						<div class="flex flex-col">
							<span class="text-stone-900 dark:text-white text-sm font-medium">{item.name}</span>
							<span class="label">{item.email}</span>
						</div>
					</div>
				</div>
			</SearchEndpointInput>
		</div>
		<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
			<DocumentEditorMembersItem name={creator.name} email={creator.email} permissionType={2} />
		</div>
		{#each permissions as permission}
			<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
				<DocumentEditorMembersItem
					name={permission.user.name}
					email={permission.user.email}
					permissionType={permission.type}
					on:permissionRemove={() => handlePermissionRemove(permission.id)}
					on:permissionChange={({ detail }) => handlePermissionChange(permission.id, detail.type)}
				/>
			</div>
		{/each}
	</div>
</SideCover>
<button type="button" class="btn btn-primary" on:click={sideCover.toggle}>
	<Icon src={Users} solid class="w-5 mr-1" />
	Membros
</button>
