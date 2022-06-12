<script lang="ts">
	import SideCover from '$lib/components/side-cover/side-cover.svelte';
	import { editorSettings } from '$lib/stores/editor-settings';

	export let sideCover: any;
</script>

<SideCover
	title="Definições do Editor"
	description="Adapte o editor de TEI ao momento de edição. Todas as configurações são guardadas na sua máquina pessoal."
	bind:this={sideCover}
>
	<form>
		<div class="sm:grid sm:grid-cols-6 sm:gap-6 sm:items-start">
			<label for="username" class="col-span-3 sm:mt-px sm:pt-2 label"> Tamanho da fonte </label>
			<div class="mt-1 sm:mt-0 sm:col-span-3">
				<div class="max-w-lg flex rounded-md shadow-sm">
					<input
						type="number"
						name="editorFontSize"
						id="editorFontSize"
						class="input"
						min={10}
						bind:value={$editorSettings.fontSize}
					/>
				</div>
			</div>
			<label for="username" class="col-span-3 sm:mt-px sm:pt-2 label"> Tamanho do editor </label>
			<div class="mt-1 sm:mt-0 sm:col-span-3">
				<div class="max-w-lg flex rounded-md shadow-sm">
					<select
						name="editorFontSize"
						id="editorFontSize"
						class="input"
						bind:value={$editorSettings.editorColSize}
					>
						<option value="6">Pequeno</option>
						<option value="8">Grande</option>
						<option value="12">Ecrã Completo</option>
					</select>
				</div>
			</div>
		</div>
	</form>
</SideCover>
