<script lang="ts">
	export let title: string;
</script>

<header>
	<div class="page-header">
		<div class="flex items-center justify-between">
			<h1 class="title-1">{title}</h1>
			<div class="flex items-center gap-3">
				<slot />
			</div>
		</div>
	</div>
</header>
