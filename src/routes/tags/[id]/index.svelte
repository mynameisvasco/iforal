<script lang="ts">
	import { enhance } from '$lib/client/forms';
	import type { Tag } from '@prisma/client';
	import { Icon, Save } from 'svelte-hero-icons';
	import TagCreateForm from './_tag-edit-form.svelte';

	export let data: Tag;
</script>

<svelte:head>
	<title>iForal - Tag</title>
</svelte:head>

<main>
	<div class="page-body mt-12">
		<form action="/tags/{data.id}?_method=PUT" method="post" use:enhance={{ redirect: '/tags' }}>
			<TagCreateForm tag={data} />
			<div class="py-8">
				<div class="border-t border-stone-300 dark:border-stone-700" />
			</div>
			<div class="flex justify-end gap-6">
				<button class="btn btn-primary" type="submit">
					<Icon src={Save} solid class="w-5 mr-1" /> Guardar
				</button>
			</div>
		</form>
	</div>
</main>
