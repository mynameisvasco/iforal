<script>
	import Notification from '$lib/client/components/notification/notification.svelte';
	import { notifications } from '$lib/client/notifications';
</script>

<div class="flex flex-col absolute w-full h-full p-8 gap-6 items-end pointer-events-none">
	{#each $notifications as notification}
		<Notification title={notification.title} type={notification.type}>
			{notification.message}
		</Notification>
	{/each}
</div>
