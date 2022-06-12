<script lang="ts">
	import type { Document } from '@prisma/client';
	import { Menu, MenuButton, MenuItem, MenuItems } from '@rgossiaux/svelte-headlessui';
	import { getContext } from 'svelte';
	import { ChevronDown, Icon, Users } from 'svelte-hero-icons';
	import DocumentEditorInviteSidecover from './_document-editor-members-sidecover.svelte';
	import DocumentEditorSetttingsSidecover from './_document-editor-setttings-sidecover.svelte';

	const document = getContext<Document>('document');
	let editorSettingsSideCover: any;
	let editorInviteSideCover: any;
</script>

<DocumentEditorSetttingsSidecover bind:sideCover={editorSettingsSideCover} />
<DocumentEditorInviteSidecover bind:sideCover={editorInviteSideCover} />
<div class="flex items-center gap-3">
	<Menu class="relative">
		<MenuButton>
			<button class="btn btn-secondary flex items-center">
				Ações
				<Icon src={ChevronDown} class="w-4 ml-1" />
			</button>
		</MenuButton>
		<MenuItems class="dropdown-menu">
			<MenuItem href="/documents/{document.id}/header" class="dropdown-menu-item">
				Editar Cabeçalho
			</MenuItem>
			<MenuItem href="/documents/{document.id}/images" class="dropdown-menu-item">
				Editar Imagens
			</MenuItem>
			<MenuItem class="dropdown-menu-item" on:click={editorSettingsSideCover.toggle}>
				Configurar Editor
			</MenuItem>
			<MenuItem class="dropdown-menu-item !text-red-500 dark:!text-red-300">Apagar</MenuItem>
		</MenuItems>
	</Menu>
	<button class="btn btn-primary" on:click={editorInviteSideCover.toggle}>
		<Icon src={Users} solid class="w-5 mr-1" />
		Membros
	</button>
</div>
