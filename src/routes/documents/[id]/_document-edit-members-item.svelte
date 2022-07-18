<script lang="ts">
	import Avatar from '$lib/components/avatar/avatar.svelte';
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let email: string;
	export let permissionType: number;

	const dispatcher = createEventDispatcher();
</script>

<div class="flex items-center justify-between w-full ">
	<div class="flex gap-3">
		<Avatar {name} size={42} />
		<div class="flex flex-col">
			<span class="text-stone-900 dark:text-white text-sm">{name}</span>
			<span class="label">{email}</span>
		</div>
	</div>
	<div>
		<select
			class="input-sm"
			disabled={permissionType === 2}
			bind:value={permissionType}
			on:blur={() => dispatcher('permissionChange', { type: permissionType })}
		>
			<option value={0}>Leitor</option>
			<option value={1}>Editor</option>
			{#if permissionType === 2}
				<option value={2}>Criador</option>
			{/if}
		</select>
	</div>
</div>
