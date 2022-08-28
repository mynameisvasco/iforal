<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<script>
		if (localStorage.theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>

	<meta name="theme-color" content="white" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="rgb(41, 37, 36)" media="(prefers-color-scheme: dark)" />
</svelte:head>

<slot />
