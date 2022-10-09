<script lang="ts">
	import { page } from '$app/stores';
	import { ChevronRight, Home, Icon } from 'svelte-hero-icons';

	let breadcrumb: any[] = [];
	const mapping = {
		'^/documents$': 'Documentos',
		'^/documents/create$': 'Novo',
		'^/documents/[0-9]+$': 'Editor',
		'^/documents/[0-9]+/images$': 'Imagens',
		'^/documents/[0-9]+/header$': 'Cabeçalho',
		'^/tags$': 'Tags',
		'^/tags/create$': 'Nova',
		'^/tags/[0-9]+$': 'Editar',
		'^/users$': 'Utilizadores',
		'^/users/invite$': 'Convidar'
	} as any;

	$: {
		const tokens = $page.url.pathname.split('/').filter((t: string) => t !== '');
		let tokenPath = '';
		breadcrumb = tokens.map((token: string) => {
			tokenPath += `/${token}`;
			const key = Object.keys(mapping).find((k) => new RegExp(k).test(tokenPath));

			return { name: key ? mapping[key] : token, url: tokenPath };
		});
	}
</script>

<nav class="flex border-b border-stone-300 dark:border-stone-700 pb-6" aria-label="Breadcrumb">
	<ol class="flex items-center space-x-4">
		<li>
			<a
				href="/documents"
				class="text-stone-400 hover:text-stone-500 dark:text-stone-400 dark:hover:text-stone-300"
			>
				<Icon src={Home} solid class="w-5" />
			</a>
		</li>

		{#each breadcrumb as crumb}
			<li>
				<div class="flex items-center ">
					<Icon src={ChevronRight} class="w-5 text-stone-400 dark:text-stone-500" solid />
					<a
						class="ml-4 text-sm font-medium text-stone-500 hover:text-stone-600 
						dark:text-stone-400 dark:hover:text-stone-300"
						class:text-stone-800={$page.url.pathname === crumb.url}
						class:dark:text-stone-300={$page.url.pathname === crumb.url}
						href={crumb.url}
					>
						{crumb.name}
					</a>
				</div>
			</li>
		{/each}
	</ol>
</nav>
