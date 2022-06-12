<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingIcon from '$lib/components/loading-icon/loading-icon.svelte';
	import { notifications } from '$lib/stores/notifications';
	import { api } from '$lib/util/api';
	import { createForm } from 'svelte-forms-lib';
	import * as Yup from 'yup';

	const { form, errors, isSubmitting, isValid, handleSubmit, handleChange } = createForm({
		initialValues: { email: '', password: '' },
		onSubmit: handleLogin,
		validationSchema: Yup.object().shape({
			email: Yup.string().email('Email must be valid'),
			password: Yup.string().min(5, 'Password should be at least 5 characters long')
		})
	});

	async function handleLogin(values: { email: string; password: string }) {
		const { status } = await api.post(fetch, '/api/auth/login', values);

		if (status === 200) {
			await goto('/documents');
		} else {
			notifications.show({
				title: 'Erro ao fazer login',
				message: 'As credenciais fornecidas não são válidas.',
				type: 'error'
			});
		}
	}
</script>

<div class="mt-8">
	<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
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
		<div class="flex items-center justify-between">
			<a href="/forget-password" class="link text-sm"> Esqueci-me da password </a>
		</div>
		<div>
			<button
				type="submit"
				class="btn btn-primary w-full justify-center"
				disabled={$isSubmitting || !$isValid}
			>
				<LoadingIcon isLoading={$isSubmitting} />
				Entrar
			</button>
		</div>
	</form>
</div>
