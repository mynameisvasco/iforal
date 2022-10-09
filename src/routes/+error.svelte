<script lang="ts">
	import { page } from '$app/stores';
	import { Home, Icon } from 'svelte-hero-icons';
</script>

{#if $page.status == 404}
	<section class="flex items-center h-screen p-16 dark:bg-stone-900 dark:text-stone-100">
		<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
			<div class="max-w-md text-center">
				<h2 class="mb-8 font-extrabold text-9xl text-stone-900 dark:text-orange-300">404</h2>
				<p class="text-2xl font-semibold md:text-3xl">Página não encontrada</p>
				<p class="mt-4 mb-8 dark:text-stone-400">
					Mas não se preocupe, pode regressar à página principal
				</p>
				<div class="flex items-center justify-center">
					<a href="/documents" class="btn btn-primary" data-sveltekit-prefecth>
						<Icon src={Home} class="w-4 mr-1" solid />Homepage
					</a>
				</div>
			</div>
		</div>
	</section>
{:else}
	<h1>{$page.status}: {$page.error?.message}</h1>
	<span>{JSON.stringify($page.error)}</span>
{/if}
