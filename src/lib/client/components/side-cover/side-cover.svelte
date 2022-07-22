<script lang="ts">
	import { Icon, X } from 'svelte-hero-icons';

	export let title: string;
	export let description: string;

	let isOpen = false;

	export function toggle() {
		isOpen = !isOpen;
	}
</script>

{#if isOpen}
	<div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
		<!-- Background backdrop, show/hide based on slide-over state. -->
		<div class="fixed inset-0 bg-black bg-opacity-50" />

		<div class="fixed inset-0 overflow-hidden">
			<div class="absolute inset-0 overflow-hidden">
				<div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
					<div class="pointer-events-auto w-screen max-w-md">
						<form
							class="flex h-full flex-col divide-y divide-stone-300 dark:divide-stone-700 bg-white dark:bg-stone-900 shadow-xl"
						>
							<div class="h-0 flex-1 overflow-y-auto">
								<div class="bg-stone-100 dark:bg-stone-800 py-6 px-4 sm:px-6">
									<div class="flex items-center justify-between">
										<h2 class="title-2">{title}</h2>
										<div class="ml-3 flex h-7 items-center">
											<button class="text-stone-900 dark:text-white" on:click={toggle}>
												<Icon src={X} class="w-5" />
											</button>
										</div>
									</div>
									<div class="mt-1">
										<p class="label">
											{description}
										</p>
									</div>
								</div>
								<div class="flex flex-1 flex-col justify-between">
									<div class="divide-y divide-stone-300 dark:divide-stone-700 px-4 sm:px-6">
										<div class="pt-4 pb-6">
											<slot />
										</div>
									</div>
								</div>
							</div>
							<div class="flex flex-shrink-0 justify-end px-4 py-4">
								<button type="button" class="btn btn-secondary" on:click={toggle}>Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
