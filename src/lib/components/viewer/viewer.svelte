<script lang="ts">
	import { editorSettings } from '$stores/editor';
	import { viewerSettings, type ViewMode } from '$stores/viewer';
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import ViewerPagination from './viewer-pagination.svelte';
	import ViewerSettingsMenu from './viewer-settings-menu.svelte';
	//@ts-ignore
	import CETEIcean from 'CETEIcean';
	import DocumentGlossaryAddSidecover from '../documents/document-glossary-add-sidecover.svelte';

	export let images: any;
	export let documentId: number;
	export let body: any;

	let glossaryAddSideCover: any;
	const viewerId = `viewer-${Math.random()}`;
	const dispatcher = createEventDispatcher();
	const mode = writable<ViewMode>('transcription');
	const currentPage = writable(1);
	let maxPages = 1;
	const viewerElement: Writable<HTMLElement | null> = writable(null);

	onMount(() => {
		$viewerElement = document.getElementById(viewerId) as HTMLElement;
	});

	function textNodesToSpan(elements: any, recursive: boolean) {
		recursive = recursive || true;
		if (!('length' in elements)) {
			elements = [elements];
		}
		for (let node of elements) {
			if (node.nodeType === 3) {
				let span = document.createElement('span');
				span.textContent = node.textContent;
				node.parentElement?.insertBefore(span, node);
				node.remove();
			} else if (recursive) {
				textNodesToSpan(node.childNodes, false);
			}
		}
	}

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

			textNodesToSpan($viewerElement, true);
			maxPages = $viewerElement.getElementsByTagName('TEI-PB').length;
			let shouldHideNode = true;

			for (const node of $viewerElement.querySelectorAll('*')) {
				const element = node as HTMLElement;

				if (element.tagName === 'TEI-PB') {
					shouldHideNode =
						Array.from($viewerElement.getElementsByTagName('TEI-PB')).indexOf(element) !==
						$currentPage - 1;
				}

				if (
					shouldHideNode &&
					(element.tagName === 'SPAN' ||
						element.tagName === 'TEI-CHOICE' ||
						element.tagName === 'TEI-LB')
				) {
					element.classList?.add('hidden');
				}
			}
			for (const [i, head] of Array.from(
				$viewerElement.getElementsByTagName('TEI-HEAD')
			).entries()) {
				head.classList.add('block', 'mb-2', 'font-semibold');
			}

			for (const [i, lb] of Array.from($viewerElement.getElementsByTagName('TEI-LB')).entries()) {
				const lineNumber = lb.getAttribute('n') ?? '0';
				const lineLabel = document.createElement('span');
				const space = document.createElement('div');
				lineLabel.innerHTML = `${lineNumber}.`;
				lineLabel.classList.add('font-semibold', 'mr-2', 'select-none');
				space.classList.add('mb-2');
				lb.appendChild(lineLabel);
				if (i !== 0) lb.before(space);
			}

			for (const [i, cb] of Array.from($viewerElement.getElementsByTagName('TEI-CB')).entries()) {
				const lineNumber = cb.getAttribute('n') ?? '0';
				cb.innerHTML = `Coluna ${lineNumber}`;
				cb.classList.add('flex', 'my-2', 'font-semibold');
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

			for (const add of Array.from($viewerElement.getElementsByTagName('TEI-ADD'))) {
				const placeTranslation = {
					above: 'em-cima',
					bellow: 'em-baixo',
					margin: 'margem',
					inline: 'na-linha',
					opposite: 'em-oposição'
				} as any;

				const tooltip = document.createElement('span');
				tooltip.classList.add('tooltip');
				tooltip.innerText = `Adicionado ${placeTranslation[add.getAttribute('place')!]}: ${
					(add as any).innerText
				}`;
				add.appendChild(tooltip);
				add.classList.add('underline', 'underline-offset-4', 'font-bold', 'has-tooltip');
			}

			for (const del of Array.from($viewerElement.getElementsByTagName('TEI-DEL'))) {
				const tooltip = document.createElement('span');
				const rendTranslation = {
					overstrike: 'riscado',
					overtyped: 'sobreposto',
					underlined: 'sublinhado'
				} as any;

				tooltip.classList.add('tooltip');
				tooltip.innerText = `Cancelado ${rendTranslation[del.getAttribute('rend')!]}: ${
					(del as any).innerText
				}`;

				del.appendChild(tooltip);
				del.classList.add('underline', 'underline-offset-4', 'font-bold', 'has-tooltip');
			}

			for (const unclear of Array.from($viewerElement.getElementsByTagName('TEI-UNCLEAR'))) {
				const tooltip = document.createElement('span');
				const reasonTranslation = {
					faded: 'esbatido',
					eccentric_ductus: 'ductos-irregular',
					illegible: 'ilegivel'
				} as any;

				tooltip.classList.add('tooltip');
				tooltip.innerText = `Leitura duvidosa ${
					reasonTranslation[unclear.getAttribute('reason')!]
				}`;
				unclear.appendChild(tooltip);
				unclear.classList.add('underline', 'underline-offset-4', 'font-bold', 'has-tooltip');
			}

			for (const gap of Array.from($viewerElement.getElementsByTagName('TEI-GAP'))) {
				const tooltip = document.createElement('span');
				const reasonTranslation = {
					damage: 'acidente',
					cancelled: 'cancelado',
					deleted: 'raspado',
					illegible: 'ilegivel'
				} as any;

				tooltip.classList.add('tooltip');
				tooltip.innerText = `Lacuna do suporte ${reasonTranslation[gap.getAttribute('reason')!]}`;
				gap.appendChild(tooltip);
				gap.classList.add('underline', 'underline-offset-4', 'font-bold', 'has-tooltip');
			}

			for (const damage of Array.from($viewerElement.getElementsByTagName('TEI-DAMAGE'))) {
				const tooltip = document.createElement('span');
				tooltip.classList.add('tooltip');
				tooltip.innerText = `Mancha`;
				damage.appendChild(tooltip);
				damage.classList.add('underline', 'underline-offset-4', 'font-bold', 'has-tooltip');
			}

			for (const note of Array.from($viewerElement.getElementsByTagName('TEI-NOTE'))) {
				const targetId = note.getAttribute('xml:id');
				if (!targetId) continue;
				const target = $viewerElement.querySelector('[target="#' + targetId + '"]');
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

<DocumentGlossaryAddSidecover bind:sideCover={glossaryAddSideCover} />

<div>
	<div
		class="flex flex-col w-full bg-stone-50 dark:bg-stone-900 p-1 
			rounded-t-md border border-stone-300 dark:border-stone-700 "
	>
		<div class="flex items-center justify-between gap-1 h-10">
			<ViewerPagination
				{currentPage}
				{maxPages}
				folio={$viewerElement?.getElementsByTagName('TEI-PB')[$currentPage - 1].getAttribute('n')}
			/>
			<ViewerSettingsMenu
				{glossaryAddSideCover}
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
		border-stone-300 dark:border-stone-700 overflow-y-scroll max-h-[800px] printable"
		class:hidden={!$editorSettings.isPreviewMode}
		style="font-size: {$viewerSettings.fontSize}px;"
	/>
</div>
