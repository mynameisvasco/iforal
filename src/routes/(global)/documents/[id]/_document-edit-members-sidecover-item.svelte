<script lang="ts">
	import { page } from '$app/stores';
	import Avatar from '$lib/components/avatar.svelte';
	import { enhance } from '$lib/forms';
	import { Icon, Trash } from 'svelte-hero-icons';

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
		<Avatar {name} size={42} />
		<div class="flex flex-col">
			<div class="flex items-center gap-2 text-stone-900 dark:text-white text-sm font-medium">
				{name}
				{#if permissionType !== 2}
					<form
						action="/documents/{$page.data.document.id}/permissions/{id}?_method=DELETE"
						method="post"
						use:enhance
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
			action="/documents/{$page.data.document.id}/permissions/{id}?_method=PUT"
			method="post"
			bind:this={changePermissionForm}
			use:enhance
		>
			<select
				id="type"
				name="type"
				class="input-sm"
				disabled={permissionType === 2}
				bind:value={permissionType}
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
