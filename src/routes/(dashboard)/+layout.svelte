<script lang="ts">
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import Breadcrumb from '$lib/components/breadcrumb.svelte';
	import NotificationsContainer from '$lib/components/notifications/notifications-container.svelte';
	import ModalContainer from '$lib/components/modal-container.svelte';
</script>

<ModalContainer />
<NotificationsContainer />
<div class="bg-stone-100 dark:bg-stone-900 min-h-screen">
	<Navbar />
	<div class="px-4 xl:px-16 2xl:px-24 pt-6">
		<Breadcrumb />
	</div>
	<slot />
</div>
