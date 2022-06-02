<script lang="ts">
	import { createEventDispatcher, onDestroy, setContext } from 'svelte';
	import * as Yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { Check, Icon } from 'svelte-hero-icons';
	import DocumentCreateFormImages from './_document-create-form-images.svelte';
	import DocumentCreateFormSource from './_document-create-form-source.svelte';
	import DocumentCreateFormTitle from './_document-create-form-title.svelte';
	import { fileToBase64 } from '$lib/util/base64';
	import { browser } from '$app/env';

	const dispatcher = createEventDispatcher();
	let cachedForm: any | null = null;

	if (browser) {
		cachedForm = JSON.parse(localStorage.getItem('create-document-form') ?? 'null');
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: { ...cachedForm, images: [] } ?? {
			title: '',
			editors: [],
			responsibles: [],
			funders: [],
			country: 'PT',
			institution: '',
			repository: '',
			idno: '',
			author: '',
			originDate: '',
			originPlace: '',
			images: []
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().min(3, 'O título da obra deve ter pelo menos 3 caracteres')
		}),
		onSubmit: handleCreate
	});

	async function handleCreate(values: any) {
		const imagesBase64 = [];

		for (const image of values.images) {
			imagesBase64.push({ name: image.name, contents: await fileToBase64(image) });
		}

		dispatcher('create', {
			...values,
			images: imagesBase64,
			editors: JSON.stringify(values.editors),
			responsibles: values.responsibles.map((i: any) => i.text).join(','),
			funders: values.funders.map((i: any) => i.name).join(',')
		});
	}

	const unsubscribeForm = form.subscribe(
		(v) => browser && localStorage.setItem('create-document-form', JSON.stringify(v))
	);

	setContext('handleChange', handleChange);
	setContext('form', form);
	setContext('errors', errors);

	onDestroy(() => {
		unsubscribeForm();
	});
</script>

<DocumentCreateFormTitle />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<DocumentCreateFormSource />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<DocumentCreateFormImages bind:images={$form.images} />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<div class="flex justify-end gap-6">
	<button class="btn btn-primary" on:click={handleSubmit}>
		<Icon src={Check} class="w-5 mr-1" solid />
		Guardar
	</button>
</div>
