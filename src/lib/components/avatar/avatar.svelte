<script lang="ts">
	export let name: string;
	export let size: number = 8;
</script>

<img
	style={size !== 8 ? `width: ${size}px` : ''}
	class:w-8={size === 8}
	class="rounded-full"
	src="https://ui-avatars.com/api/?background=random&name={name}"
	alt={name}
/>
