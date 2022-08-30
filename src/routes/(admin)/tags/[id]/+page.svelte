<script lang="ts">
	import TagCreateForm from './_tag-edit-form.svelte';
	import type { PageData } from '../../../../../.svelte-kit/types/src/routes/(global)/tags/[id]/$types';
	import PageBody from '$lib/components/page-body.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>iForal - Tag</title>
</svelte:head>

<PageBody>
	<TagCreateForm tag={data.tag} />
</PageBody>
