<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Icon, X } from 'svelte-hero-icons';
	export let id: string;
	export let addingValues: any = {};

	export let value = [] as any;

	let values: any[] = [];
	let input: HTMLInputElement;

	const updateInterval = setInterval(() => {
		values = JSON.parse(input.value);
	}, 200);

	function handleRemove(index: number) {
		values = JSON.parse(input.value).filter((_: any, i: number) => i !== index) as any;
		input.value = JSON.stringify(values);
		input.dispatchEvent(new Event('change'));
	}

	function handleAdd() {
		if (Object.values(addingValues).filter((v: any) => v === '').length === 0) {
			values = [...(JSON.parse(input.value) as any), { ...addingValues }];
			input.value = JSON.stringify(values);
			input.dispatchEvent(new Event('change'));

			for (const key of Object.keys(addingValues)) {
				addingValues[key] = '';
			}
		}
	}

	onDestroy(() => clearInterval(updateInterval));
</script>

<input type="hidden" {id} name={id} bind:this={input} value={JSON.stringify(value)} />

<div class="flex flex-col">
	{#each values as value, i}
		<div
			class="flex justify-between border-b border-stone-300 dark:border-stone-700 pb-3 mb-3 pt-3"
		>
			<slot name="list" {value} index={i} />
			<div on:click={() => handleRemove(i)}>
				<Icon src={X} class="w-4 text-stone-500" solid />
			</div>
		</div>
	{/each}
	<div class="flex justify-between items-center gap-3">
		<slot name="inputs" {handleAdd} />
	</div>
</div>
