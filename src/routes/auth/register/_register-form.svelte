<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingIcon from '$lib/components/loading-icon/loading-icon.svelte';
	import { notifications } from '$lib/stores/notifications';
	import { api } from '$lib/util/api';
	import { createForm } from 'svelte-forms-lib';
	import * as Yup from 'yup';

	const { form, errors, isSubmitting, isValid, handleSubmit, handleChange } = createForm({
		initialValues: { name: '', email: '', password: '' },
		onSubmit: handleLogin,
		validationSchema: Yup.object().shape({
			name: Yup.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
			email: Yup.string().min(3, 'O email deve ser válido').email('O email deve ser válido'),
			password: Yup.string().min(5, 'A password deve ter pelo menos 5 caracteres')
		})
	});

	async function handleLogin(values: { name: string; email: string; password: string }) {
		const { status } = await api.post(fetch, '/api/auth/register', values);

		if (status === 200) {
			await goto('/auth/login');
			notifications.show({
				title: 'Conta criada com sucesso',
				type: 'success',
				message: 'A sua conta foi criada, por favor faça login.'
			});
		}
	}
</script>

<div class="mt-8">
	<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
		<div>
			<label for="name" class="label"> Nome </label>
			<div class="mt-1">
				<input
					id="name"
					name="name"
					type="text"
					class="input"
					class:input-error={$errors.name}
					bind:value={$form.name}
					on:change={handleChange}
				/>
				<div class="error-label mt-2">{$errors.name}</div>
			</div>
		</div>
		<div>
			<label for="email" class="label"> Endereço de Email </label>
			<div class="mt-1">
				<input
					id="email"
					name="email"
					type="text"
					class="input"
					class:input-error={$errors.email}
					bind:value={$form.email}
					on:change={handleChange}
				/>
				<div class="error-label mt-2">{$errors.email}</div>
			</div>
		</div>
		<div>
			<label for="password" class="label"> Password </label>
			<div class="mt-1">
				<input
					id="password"
					name="password"
					type="password"
					class="input"
					class:input-error={$errors.password}
					bind:value={$form.password}
					on:change={handleChange}
				/>
				<div class="error-label">{$errors.password}</div>
			</div>
		</div>
		<div>
			<button
				type="submit"
				class="btn btn-primary w-full justify-center"
				disabled={$isSubmitting || !$isValid}
			>
				<LoadingIcon isLoading={$isSubmitting} />
				Criar
			</button>
		</div>
	</form>
</div>
