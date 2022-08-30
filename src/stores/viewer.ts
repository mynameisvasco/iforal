import { writable } from 'svelte-local-storage-store';
//@ts-ignore
import CETEIcean from 'CETEIcean';

interface ViewerSettings {
	fontSize: number;
	isFullWidth: boolean;
	isViewerMode: boolean;
}

function createViewerSettings() {
	const store = writable('viewer', {
		fontSize: 18,
		isFullWidth: false,
		isViewerMode: false
	} as ViewerSettings);

	return { ...store };
}

export const viewerSettings = createViewerSettings();

export function createViewer(parent: HTMLElement, body: string) {
	const teiParser = new CETEIcean();
	teiParser.addBehaviors({
		tei: {
			choice: (element: HTMLElement) => {
				element.classList.add('text-stone-900', 'dark:text-orange-300');
				element.style.textDecoration = 'underline';
			},
			abbr: (element: HTMLElement) => {
				element.classList.add('hidden');
			},
			expan: (element: HTMLElement) => {
				element.classList.add('has-tooltip');
				const abbr = (element.previousElementSibling as HTMLElement)?.innerText;
				if (abbr?.trim()) {
					const tooltip = document.createElement('span');
					tooltip.classList.add('tooltip');
					tooltip.textContent = abbr;
					element.appendChild(tooltip);
				}
			}
		}
	});

	teiParser.makeHTML5(body, (data: any) => document.getElementById('viewer')?.appendChild(data));
}
