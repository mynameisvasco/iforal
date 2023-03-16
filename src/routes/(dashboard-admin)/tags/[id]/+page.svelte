<script lang="ts">
	import TagCreateForm from './_tag-edit-form.svelte';
	import PageBody from '$lib/components/page-body.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>iForal - Tag</title>
</svelte:head>

<PageBody>
	<TagCreateForm tag={data.tag} />
</PageBody>
