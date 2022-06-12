<script lang="ts">
	import Avatar from '$lib/components/avatar/avatar.svelte';

	export let name: string;
	export let email: string;
	export let permissionType: number;
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
		<select class="input-sm" disabled bind:value={permissionType}>
			<option value={0}>Leitor</option>
			<option value={1}>Editor</option>
			<option value={2}>Criador</option>
		</select>
	</div>
</div>
