<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
</script>

<div>
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<h3 class="title-2">Codificação de caracteres</h3>
			<p class="mt-1 label">Descreve a forma como certos caracteres especiais são codificados</p>
		</div>
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="grid grid-cols-12 gap-6 card p-6">
				<div class="col-span-12">
					<label for="title" class="label">Codificação</label>
					<textarea
						id="encoding"
						name="encoding"
						class="input mt-1"
						type="text"
						placeholder="Neste foral..."
						rows="9"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
