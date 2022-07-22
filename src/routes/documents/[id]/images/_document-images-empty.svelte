<script lang="ts">
	import { page } from '$app/stores';

	import EmptyState from '$lib/client/components/empty-state/empty-state.svelte';
	import { enhance } from '$lib/client/forms';
	import { Photograph, Icon, Upload } from 'svelte-hero-icons';

	const documentId = parseInt($page.params.id);
	let form: HTMLFormElement;
	let fileInput: HTMLInputElement;

	function handleChange() {
		form.dispatchEvent(new SubmitEvent('submit'));
	}
</script>

<EmptyState
	title="Não existem imagens"
	description="Ainda não carregou nenhuma imagem neste documento"
	icon={Photograph}
>
	<form action="/documents/{documentId}/images" method="post" use:enhance bind:this={form}>
		<input
			id="images"
			name="images"
			class="hidden"
			type="file"
			accept=".jpg, .jpeg, .png, .bmp"
			multiple
			on:change={handleChange}
			bind:this={fileInput}
		/>
		<button class="btn btn-primary" on:click={() => fileInput.click()}>
			<Icon src={Upload} class="w-5 mr-1" solid />
			Imagem
		</button>
	</form>
</EmptyState>
