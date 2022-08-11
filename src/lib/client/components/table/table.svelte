<script lang="ts">
	export let headers: string[];
	export let data: any[];
</script>

<div class="flex flex-col">
	<div class="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
			<div class="shadow">
				<table class="min-w-full" style="border-radius: 50px !important;">
					<thead
						class="bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-700"
					>
						<tr>
							{#each headers as header, i}
								<th
									class:pl-6={i === 0}
									class:pl-3={i !== 0}
									class="py-3.5 pr-3 text-left text-sm font-medium text-stone-900
									dark:text-stone-50"
								>
									{header}
								</th>
							{/each}
						</tr>
					</thead>
					<tbody class="bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700">
						{#each data as item}
							<slot {item} />
						{:else}
							<tr>
								<td
									colspan={headers.length}
									class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-stone-900
									dark:text-stone-300 sm:pl-6 "
								>
									Ainda não existem registos
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
