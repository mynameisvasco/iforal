<script lang="ts">
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import SideCover from '$lib/components/side-cover/side-cover.svelte';
	import type { Document, User } from '@prisma/client';
	import { getContext } from 'svelte';
	import DocumentEditorMembersItem from './_document-editor-members-item.svelte';

	export let sideCover: any;
	const document = getContext<Document & { user: User }>('document');
</script>

<SideCover
	title="Membros"
	description="Faça a gestão de quem tem acesso ao documento e que permissões em particular cada um dos membros tem."
	bind:this={sideCover}
>
	<div class="flex flex-col gap-6">
		<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
			<input type="text" class="input" placeholder="Adicionar membro pelo nome ou email" />
		</div>
		<div class="border-b border-stone-200 dark:border-stone-700 pb-6">
			<DocumentEditorMembersItem
				name={document.user.name}
				email={document.user.email}
				permissionType={2}
			/>
		</div>
	</div>
</SideCover>
