<script lang="ts">
	import { modals } from '$lib/components/stores/modals';
	import { disableScrolling, enableScrolling } from '$lib/util/scroll';
	import { onMount } from 'svelte';
	import { Icon } from 'svelte-hero-icons';

	export let id: string;
	export let title: string;
	export let icon: any;
	export let actionName: string;
	export let actionColor = 'primary';
	export let action: () => void;

	onMount(() => {
		disableScrolling();
	});

	function handleAction() {
		action();
		modals.close(id);
		enableScrolling();
	}

	function handleCancel() {
		modals.close(id);
		enableScrolling();
	}
</script>

<div class="relative z-10">
	<div
		class="fixed inset-0 bg-stone-500 dark:bg-stone-800 bg-opacity-75 dark:bg-opacity-75 
    transition-opacity"
	/>

	<div class="fixed z-10 inset-0 overflow-y-auto">
		<div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
			<div
				class="relative bg-white dark:bg-stone-900 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden 
        shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6"
			>
				<div class="sm:flex sm:items-start">
					<div
						class="mx-auto flex-shrink-0 flex items-center justify-center h-24 w-24 rounded-full 
            bg-stone-200 dark:bg-stone-800 sm:mx-0 sm:h-10 sm:w-10"
					>
						<Icon src={icon} class="w-6 text-stone-700 dark:text-stone-300" solid />
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="title-2 text-stone-900 dark:text-white">
							{title}
						</h3>
						<div class="my-2">
							<p class="text-base text-stone-500 dark:text-stone-400">
								<slot />
							</p>
						</div>
					</div>
				</div>
				<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
					<button type="button" class="btn btn-{actionColor}" on:click={handleAction}>
						{actionName}
					</button>
					<button type="button" class="btn btn-secondary" on:click={handleCancel}>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
