<script lang="ts">
	import { format as formatDate } from 'date-fns';
	import { DotsVertical, Icon, Photograph } from 'svelte-hero-icons';
	import pt from 'date-fns/locale/pt/index.js';
	import DocumentActions from './document-actions.svelte';
	import { createEventDispatcher } from 'svelte';

	export let document: any;
	export let href: string | undefined = undefined;
	export let showActions: boolean = true;

	const dispatcher = createEventDispatcher();

	function handleClick(event: Event) {
		if (!href) event.preventDefault();
		dispatcher('open');
	}
</script>

<a {href} on:click={handleClick}>
	<div class="flex flex-col card hover:border-stone-900 dark:hover:border-orange-300">
		{#if document.images[0]}
			<img
				src="/images/{document.images[0].name}"
				alt="Imagem ilustrativa {document.title}"
				class="h-72 object-cover rounded-t-lg w-full"
			/>
		{:else}
			<div
				class="bg-stone-50 dark:bg-stone-900 w-full h-72 rounded-t-lg flex items-center 
				justify-center"
			>
				<Icon src={Photograph} class="w-16 text-stone-400 dark:text-stone-500" />
			</div>
		{/if}
		<div class="p-3 border-t border-stone-300 dark:border-stone-700 rounded-b-lg">
			<div class="flex justify-between items-center">
				<div class="flex flex-col">
					<h2 class="text-stone-900 dark:text-white font-medium text-md">{document.title}</h2>
					<span class="text-stone-500 dark:text-stone-400 text-sm">
						{formatDate(new Date(document.header.originDate), 'yyyy', { locale: pt })}
					</span>
				</div>
				{#if showActions}
					<DocumentActions id={document.id}>
						<Icon
							src={DotsVertical}
							class="w-8 p-1 text-stone-900 dark:text-white 
						hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full"
						/>
					</DocumentActions>
				{/if}
			</div>
		</div>
	</div>
</a>
