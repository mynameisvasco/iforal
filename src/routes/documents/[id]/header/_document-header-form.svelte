<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Check, Icon } from 'svelte-hero-icons';
</script>

<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<div class="flex justify-end gap-6">
	<button class="btn btn-primary">
		<Icon src={Check} class="w-5 mr-1" solid />
		Guardar
	</button>
</div>
