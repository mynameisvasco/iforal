<script>
	import { Icon, Plus } from 'svelte-hero-icons';
</script>

<a
	href="/documents/create"
	class="border-2 border-dashed border-stone-400 dark:border-stone-500 h-full rounded-md
  flex flex-col items-center justify-center hover:border-stone-900 dark:hover:border-orange-300 
  transition-all text-stone-500 hover:text-stone-900 dark:hover:text-orange-300 cursor-pointer"
>
	<div class="flex flex-col items-center">
		<Icon src={Plus} solid class="w-16" />
		<span class="font-medium text-lg">Novo documento</span>
	</div>
</a>
