<script lang="ts">
	export let errors: any;
</script>

<div>
	<label for="email" class="label"> Endereço de Email </label>
	<div class="mt-1">
		<input id="email" name="email" type="text" class="input" class:input-error={errors['email']} />
		{#if errors['email']}
			<span class="error-label">{errors['email']}</span>
		{/if}
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
			class:input-error={errors['password']}
		/>
		{#if errors['password']}
			<span class="error-label">{errors['password']}</span>
		{/if}
	</div>
</div>
<div class="flex items-center justify-between">
	<a href="/forget-password" class="link text-sm" sveltekit:prefetch> Esqueci-me da password </a>
</div>
<div>
	<button type="submit" class="btn btn-primary w-full justify-center"> Entrar </button>
</div>
