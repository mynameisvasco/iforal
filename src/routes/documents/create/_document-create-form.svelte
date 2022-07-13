<script lang="ts">
	import { createEventDispatcher, onDestroy, setContext } from 'svelte';
	import * as Yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { Check, Icon, Save } from 'svelte-hero-icons';
	import DocumentCreateFormImages from './_document-create-form-images.svelte';
	import DocumentCreateFormSource from './_document-create-form-source.svelte';
	import DocumentCreateFormTitle from './_document-create-form-title.svelte';
	import { fileToBase64 } from '$lib/util/base64';
	import { browser } from '$app/env';
	import { modals } from '$lib/components/stores/modals';
	import DocumentCreateFormEncoding from './_document-create-form-encoding.svelte';
	import { goto } from '$app/navigation';
	import { api } from '$lib/util/api';
	import DocumentCreateFormPublication from './_document-create-form-publication.svelte';
	import LoadingIcon from '$lib/components/loading-icon/loading-icon.svelte';
	import { notifications } from '$lib/components/stores/notifications';

	let cachedForm: any | null = null;

	if (browser) {
		cachedForm = JSON.parse(localStorage.getItem('create-document-form') ?? 'null');
	}

	const { form, errors, handleChange, handleSubmit, isSubmitting, isValid } = createForm({
		initialValues: {
			title: '',
			editors: [],
			funders: [],
			country: 'PT',
			institution: '',
			repository: '',
			idno: '',
			authors: [],
			originDate: '',
			originPlace: '',
			lang: 'pt',
			filliation: '',
			summary: '',
			encoding: '',
			publisher: '',
			publisherPlace: '',
			publisherDate: '',
			altIdentifier: [],
			settlement: '',
			license: 'Creative Commons Attribution-ShareAlike (CC BY-SA)',
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

		const { status } = await api.post(fetch, '/api/documents', {
			...values,
			images: imagesBase64,
			editors: JSON.stringify(values.editors),
			altIdentifier: JSON.stringify(values.altIdentifier),
			funders: values.funders.map((i: any) => i.name).join(',')
		});

		if (status === 200) {
			notifications.show({
				title: 'Documento criado',
				message: 'O documento encontra-se agora guardado no sistema.',
				type: 'success'
			});
			localStorage.removeItem('create-document-form');
			await goto('/documents');
		}
	}

	const unsubscribeForm = form.subscribe(
		(v) => browser && localStorage.setItem('create-document-form', JSON.stringify(v))
	);

	setContext('handleChange', handleChange);
	setContext('form', form);
	setContext('errors', errors);

	if (cachedForm && cachedForm.title !== '') {
		modals.open({
			id: 'recover-document',
			title: 'Rascunho guardado',
			description: `Existe um rascunho da última sessão com o título "${cachedForm.title}", deseja continuar o trabalho?`,
			actionName: 'Continuar',
			icon: Save,
			action: () => form.set({ ...cachedForm, images: [] })
		});
	}

	onDestroy(() => {
		unsubscribeForm();
	});
</script>

<DocumentCreateFormTitle />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<DocumentCreateFormPublication />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<DocumentCreateFormSource />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<DocumentCreateFormEncoding />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<DocumentCreateFormImages bind:images={$form.images} />
<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<div class="flex justify-end gap-6">
	<button class="btn btn-primary" on:click={handleSubmit} disabled={$isSubmitting || !$isValid}>
		<LoadingIcon isLoading={$isSubmitting} otherIcon={Check} />
		Guardar
	</button>
</div>
