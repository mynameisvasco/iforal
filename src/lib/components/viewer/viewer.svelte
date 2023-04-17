<script lang="ts">
	import { editorSettings } from '$stores/editor';
	import { viewerSettings, type ViewMode } from '$stores/viewer';
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import ViewerPagination from './viewer-pagination.svelte';
	import ViewerSettingsMenu from './viewer-settings-menu.svelte';
	//@ts-ignore
	import CETEIcean from 'CETEIcean';

	export let images: any;
	export let documentId: number;
	export let body: any;

	const viewerId = `viewer-${Math.random()}`;
	const dispatcher = createEventDispatcher();
	const mode = writable<ViewMode>('transcription');
	const currentPage = writable(1);
	let maxPages = 1;
	const viewerElement: Writable<HTMLElement | null> = writable(null);

	onMount(() => {
		$viewerElement = document.getElementById(viewerId) as HTMLElement;
	});

	$: {
		if ($viewerElement) {
			const reader = new CETEIcean();

			reader.makeHTML5(
				`<TEI version="3.3.0" xmlns="http://www.tei-c.org/ns/1.0">\n${body}\n</TEI>`,
				(data: any) => {
					$viewerElement!.innerHTML = '';
					$viewerElement!.appendChild(data);
				}
			);

			maxPages = $viewerElement.getElementsByTagName('TEI-PB').length;
			const textNodes = $viewerElement.getElementsByTagName('TEI-BODY').item(0)!.childNodes;
			let shouldHideNode = false;

			for (const node of Array.from(textNodes)) {
				const element = node as HTMLElement;

				if (element.tagName === 'TEI-PB') {
					shouldHideNode =
						Array.from($viewerElement.getElementsByTagName('TEI-PB')).indexOf(element) !==
						$currentPage - 1;
				}

				if (shouldHideNode) {
					if (node.nodeType === Node.TEXT_NODE) {
						if (node.textContent?.trim() === '') node.remove();
						const span = document.createElement('span');
						span.textContent = node.textContent?.trim() ?? '';
						span.classList.add('hidden');
						node.replaceWith(span);
					} else {
						element.classList?.add('hidden');
					}
				}
			}

			for (const [i, lb] of Array.from($viewerElement.getElementsByTagName('TEI-LB')).entries()) {
				const lineNumber = lb.getAttribute('n') ?? '0';
				const lineLabel = document.createElement('span');
				const space = document.createElement('div');
				lineLabel.innerHTML = `${lineNumber}.`;
				lineLabel.classList.add('font-semibold', 'mr-2');
				space.classList.add('mb-2');
				lb.appendChild(lineLabel);
				if (i !== 0) lb.before(space);
			}

			for (const expan of Array.from($viewerElement.getElementsByTagName('TEI-EXPAN'))) {
				if ($mode === 'transcription') expan.classList.add('hidden');
			}

			for (const abbr of Array.from($viewerElement.getElementsByTagName('TEI-ABBR'))) {
				if ($mode === 'edited') abbr.classList.add('hidden');
			}

			for (const corr of Array.from($viewerElement.getElementsByTagName('TEI-CORR'))) {
				if ($mode === 'transcription') corr.classList.add('hidden');
			}

			for (const sic of Array.from($viewerElement.getElementsByTagName('TEI-SIC'))) {
				if ($mode === 'edited') sic.classList.add('hidden');
			}

			for (const note of Array.from($viewerElement.getElementsByTagName('TEI-NOTE'))) {
				const targetId = note.getAttribute('target')?.replace('#', '');
				if (!targetId) continue;
				const target = $viewerElement.querySelector('[xml\\:id="' + targetId + '"]');
				if (!target) continue;
				const tooltip = document.createElement('span');
				tooltip.classList.add('tooltip');
				tooltip.innerText = (note as any).innerText;
				target.appendChild(tooltip);
				target.classList.add('font-bold', 'dark:text-orange-300', 'has-tooltip');

				if (
					tooltip.clientWidth + tooltip.getBoundingClientRect().left >
					$viewerElement.getBoundingClientRect().right
				) {
					tooltip.classList.add('!-left-24');
				}

				note.remove();
			}
		}
	}
</script>

<div>
	<div
		class="flex flex-col w-full bg-stone-50 dark:bg-stone-900 p-1 
			rounded-t-md border border-stone-300 dark:border-stone-700 "
	>
		<div class="flex items-center justify-between gap-1 h-10">
			<ViewerPagination {currentPage} {maxPages} />
			<ViewerSettingsMenu
				{currentPage}
				{images}
				{documentId}
				{mode}
				on:close={(event) => dispatcher('close', { documentId: event.detail.documentId })}
			/>
		</div>
	</div>
	<div
		id={viewerId}
		class="text-stone-900 dark:text-stone-300 bg-white dark:bg-stone-800 p-8 border-b border-l border-r 
		border-stone-300 dark:border-stone-700 overflow-y-scroll max-h-[800px]"
		class:hidden={!$editorSettings.isPreviewMode}
		style="font-size: {$viewerSettings.fontSize}px;"
	/>
</div>
