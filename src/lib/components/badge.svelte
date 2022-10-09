<script lang="ts">
	export let type: 'success' | 'warning';
</script>

<span
	class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
	class:bg-orange-800={type === 'warning'}
	class:text-orange-50={type === 'warning'}
	class:bg-green-800={type === 'success'}
	class:text-green-50={type === 'success'}
	class:dark:bg-orange-300={type === 'warning'}
	class:dark:text-orange-800={type === 'warning'}
	class:dark:bg-green-300={type === 'success'}
	class:dark:text-green-800={type === 'success'}
>
	<slot />
</span>
