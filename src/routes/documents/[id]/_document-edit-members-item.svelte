<script lang="ts">
	import Avatar from '$lib/client/components/avatar/avatar.svelte';
	import { createEventDispatcher } from 'svelte';
	import { Icon, Trash } from 'svelte-hero-icons';

	export let name: string;
	export let email: string;
	export let permissionType: number;

	const dispatcher = createEventDispatcher();
</script>

<div class="flex items-center justify-between w-full ">
	<div class="flex gap-3">
		<Avatar {name} size={42} />
		<div class="flex flex-col">
			<div class="flex items-center gap-2 text-stone-900 dark:text-white text-sm font-medium">
				{name}
				{#if permissionType !== 2}
					<button type="button" on:click={() => dispatcher('permissionRemove')}>
						<Icon src={Trash} class="w-4 text-stone-500 dark:text-stone-400" solid />
					</button>
				{/if}
			</div>
			<span class="label text-xs">{email}</span>
		</div>
	</div>
	<div class="flex items-center gap-3">
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
