<script lang="ts">
	import { api } from '$lib/api';
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import SearchEndpointInput from '$lib/components/search-endpoint-input/search-endpoint-input.svelte';
	import SideCover from '$lib/components/side-cover/side-cover.svelte';
	import type { DocumentPermissions, User } from '@prisma/client';
	import DocumentEditorMembersItem from './_document-edit-members-item.svelte';

	export let sideCover: any;
	export let creator: User;
	export let permissions: (DocumentPermissions & { user: User })[] = [];

	async function handlePermissionChange(id: number, type: number) {
		await api.put(fetch, `/permissions/${id}`, { type });
	}

	async function handlePermissionAdd(email: number) {
		await api.post(fetch, `/permissions`, { email });
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
				endpoint="/users"
				searchParams={['name', 'email']}
				on:selected={({ detail }) => handlePermissionAdd(detail.item.email)}
				let:item
			>
				<div
					class="flex items-center justify-between w-full"
					class:opacity-25={permissions.map((p) => p.user.email).includes(item.email)}
				>
					<div class="flex gap-3">
						<Avatar name={item.name} size={42} />
						<div class="flex flex-col">
							<span class="text-stone-900 dark:text-white text-sm">{item.name}</span>
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
					on:permissionChange={({ detail }) => handlePermissionChange(permission.id, detail.type)}
				/>
			</div>
		{/each}
	</div>
</SideCover>
