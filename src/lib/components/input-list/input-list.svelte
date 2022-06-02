<script lang="ts">
	import { Icon, Plus, X } from 'svelte-hero-icons';

	export let values: any[] = [];
	export let addingValues: any = {};

	function handleRemove(index: number) {
		values = values.filter((_, i) => i !== index);
	}

	function handleAdd() {
		if (Object.values(addingValues).filter((v: any) => v === '').length === 0) {
			values = [...values, { ...addingValues }];

			for (const key of Object.keys(addingValues)) {
				addingValues[key] = '';
			}
		}
	}
</script>

<div class="flex flex-col">
	{#each values as value, i}
		<div class="flex justify-between border-b border-stone-300 dark:border-stone-700 pb-3 pt-3">
			<slot name="list" {value} index={i} />
			<div on:click={() => handleRemove(i)}>
				<Icon src={X} class="w-4 text-stone-500" solid />
			</div>
		</div>
	{/each}
	<div class="flex justify-between items-center gap-3 mt-3">
		<slot name="inputs" {handleAdd} />
	</div>
</div>
