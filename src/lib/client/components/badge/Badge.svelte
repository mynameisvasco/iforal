<script lang="ts">
	export let type: 'success' | 'warning';
</script>

<span
	class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
	class:bg-orange-300={type === 'warning'}
	class:text-orange-900={type === 'warning'}
	class:bg-green-300={type === 'success'}
	class:text-green-900={type === 'success'}
>
	<slot />
</span>
