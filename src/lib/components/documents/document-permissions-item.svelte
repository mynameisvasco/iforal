<script lang="ts">
	import { page } from '$app/stores';
	import UserAvatar from '$lib/components/users/user-avatar.svelte';
	import { enhance } from '$app/forms';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { formHandler } from '$lib/forms';

	export let id: number;
	export let name: string;
	export let email: string;
	export let permissionType: number;

	let changePermissionForm: HTMLFormElement;

	function handlePermissionChange() {
		changePermissionForm.dispatchEvent(new SubmitEvent('submit'));
	}
</script>

<div class="flex items-center justify-between w-full ">
	<div class="flex gap-3">
		<UserAvatar {name} size={42} />
		<div class="flex flex-col">
			<div class="flex items-center gap-2 text-stone-900 dark:text-white text-sm font-medium">
				{name}
				{#if $page.data.document.user.id === $page.data.user.id}
					<form
						action="/documents/{$page.data.document.id}/permissions/{id}?/destroy"
						method="POST"
						class:hidden={permissionType === 2}
						use:enhance={formHandler()}
					>
						<button type="submit">
							<Icon src={Trash} class="w-4 text-stone-500 dark:text-stone-400" solid />
						</button>
					</form>
				{/if}
			</div>
			<span class="label text-xs">{email}</span>
		</div>
	</div>
	<div class="flex items-center gap-3">
		<form
			action="/documents/{$page.data.document.id}/permissions/{id}?/update"
			method="POST"
			bind:this={changePermissionForm}
			use:enhance={formHandler()}
		>
			<select
				id="type"
				name="type"
				class="input-sm"
				disabled={permissionType < 1}
				value={permissionType}
				on:change={handlePermissionChange}
			>
				<option value={0}>Leitor</option>
				<option value={1}>Editor</option>
				{#if permissionType === 2}
					<option value={2}>Criador</option>
				{/if}
			</select>
		</form>
	</div>
</div>
