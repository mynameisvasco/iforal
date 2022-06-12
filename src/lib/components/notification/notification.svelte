<script lang="ts">
	import { notifications } from '$lib/stores/notifications';
	import { Check, Exclamation, Icon, X } from 'svelte-hero-icons';
	import { fade } from 'svelte/transition';

	export let title: string;
	export let type: 'success' | 'error';

	const timeout = setTimeout(handleClose, 3000);

	function handleClose() {
		notifications.close(title);
		clearTimeout(timeout);
	}
</script>

<div class="flex-1 w-full flex flex-col items-end z-10" transition:fade={{ duration: 125 }}>
	<div
		class="max-w-sm w-full bg-white dark:bg-stone-800 shadow-lg rounded-lg 
			pointer-events-auto overflow-hidden border border-stone-300 dark:border-stone-700"
	>
		<div class="p-4">
			<div class="flex items-start">
				<div class="flex-shrink-0">
					<span
						class:text-green-600={type === 'success'}
						class:dark:text-green-300={type === 'success'}
						class:text-red-600={type === 'error'}
						class:dark:text-red-300={type === 'error'}
					>
						<Icon src={type === 'success' ? Check : Exclamation} solid class="h-6 w-6" />
					</span>
				</div>
				<div class="ml-3 w-0 flex-1 pt-0.5">
					<p class="text-sm font-medium text-stone-900 dark:text-white">{title}</p>
					<p class="mt-1 text-sm text-stone-500 dark:text-stone-400">
						<slot />
					</p>
				</div>
				<div class="ml-4 flex-shrink-0 flex">
					<button class="text-stone-500 dark:text-stone-400" on:click={handleClose}>
						<Icon src={X} solid class="h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
