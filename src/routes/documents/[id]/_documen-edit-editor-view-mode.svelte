<script context="module">
	export let ssr = false;
</script>

<script lang="ts">
	import { editorSettings } from '$lib/client/editor';
	//@ts-ignore
	import CETEI from 'CETEIcean';
	import { onMount } from 'svelte';

	export let body: string;

	const CETEIcean = new CETEI({ ignoreFragmentId: true });
	CETEIcean.addBehaviors({
		namespaces: { tei: 'http://www.tei-c.org/ns/1.0' },
		tei: {
			lb: ['<br>']
		},
		lb: ['<br>']
	});

	onMount(() => {
		CETEIcean.makeHTML5(body, (data: any) => document.getElementById('viewer')?.appendChild(data));
	});
</script>

<div
	id="viewer"
	class="bg-white dark:bg-stone-800 border-b border-r border-l border-stone-300 overflow-y-auto
	dark:border-stone-700 w-full h-[750px] px-8 pt-4 rounded-b-md text-stone-800 dark:text-stone-50"
	style="line-height: 26px; font-size: {$editorSettings.fontSize}px;
	font-family: 'Merriweather', serif; word-wrap: break-word; overflow-wrap: break-word; hyphens: auto;"
/>
