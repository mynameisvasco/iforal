<script lang="ts">
	import Navbar from '$lib/client/components/navbar/navbar.svelte';
	import Breadcrumb from '$lib/client/components/breadcrumb/breadcrumb.svelte';
	import NotificationsContainer from '$lib/client/components/notification/notifications-container.svelte';
	import ModalContainer from '$lib/client/components/modal/modal-container.svelte';
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
