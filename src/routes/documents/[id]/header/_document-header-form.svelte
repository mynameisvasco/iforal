<script context="module" lang="ts">
	export async function load(context: LoadInput) {}
</script>

<script lang="ts">
	import { createEventDispatcher, setContext } from 'svelte';
	import * as Yup from 'yup';
	import { createForm } from 'svelte-forms-lib';
	import { Check, Icon, Save } from 'svelte-hero-icons';
	import type { LoadInput } from '@sveltejs/kit';

	const dispatcher = createEventDispatcher();

	const { form, errors, handleChange, handleSubmit } = createForm({
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
			images: []
		},
		validationSchema: Yup.object().shape({
			title: Yup.string().min(3, 'O título da obra deve ter pelo menos 3 caracteres')
		}),
		onSubmit: handleCreate
	});

	async function handleCreate(values: any) {
		dispatcher('create', {
			...values,
			editors: JSON.stringify(values.editors),
			funders: values.funders.map((i: any) => i.name).join(',')
		});
	}

	setContext('handleChange', handleChange);
	setContext('form', form);
	setContext('errors', errors);
</script>

<div class="py-8">
	<div class="border-t border-stone-300 dark:border-stone-700" />
</div>
<div class="flex justify-end gap-6">
	<button class="btn btn-primary" on:click={handleSubmit}>
		<Icon src={Check} class="w-5 mr-1" solid />
		Guardar
	</button>
</div>
