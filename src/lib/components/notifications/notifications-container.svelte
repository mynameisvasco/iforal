<script>
	import Notification from './notification.svelte';
	import { notifications } from '$stores/notifications';
</script>

<div class="flex flex-col fixed w-full h-full p-8 gap-6 items-end pointer-events-none z-10">
	{#each $notifications as notification}
		<Notification title={notification.title} type={notification.type}>
			{notification.message}
		</Notification>
	{/each}
</div>
