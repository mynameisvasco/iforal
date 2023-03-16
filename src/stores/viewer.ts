import type { Document } from '@prisma/client';
import { writable } from 'svelte-local-storage-store';
//@ts-ignore
import CETEIcean from 'CETEIcean';

export interface ViewerIndividualSettings {
	fontSize: number;
	isTranscription: boolean;
}

export interface ViewerSettings {
	viewingDocumentIds: (number | null)[];
	individualSettings: ViewerIndividualSettings[];
}

function getTranscriptionTEIBehavior() {
	return {
		tei: {
			expan: (element: HTMLElement) => {
				element.classList.add('hidden');
			},
			corr: (element: HTMLElement) => {
				element.classList.add('hidden');
			},
			pb: (element: HTMLElement) => {},
			lb: function (element: HTMLElement) {
				let lineIndex = (this as any).lineIndex ?? -1;
				lineIndex++;
				(this as any).lineIndex = lineIndex;
				const lineNumber = element.attributes.getNamedItem('n')?.value ?? '0';
				const lineLabel = document.createElement('span');
				lineLabel.innerHTML = `${lineNumber}.`;
				lineLabel.classList.add('font-semibold');

				if (lineIndex !== 0) {
					lineLabel.insertAdjacentElement('afterbegin', document.createElement('br'));
				}

				return lineLabel;
			},
			note: function (element: HTMLElement) {
				let noteIndex = (this as any).noteIndex ?? 0;
				noteIndex++;
				(this as any).noteIndex = noteIndex;
				const id = `note-${noteIndex}`;
				let link = document.createElement('a');
				link.setAttribute('id', id);
				link.setAttribute('href', '#src' + id);
				link.innerHTML = noteIndex;
				const content = document.createElement('sup');
				content.appendChild(link);
				let notes = (this as any).dom.querySelector('ol.notes');

				if (!notes) {
					notes = document.createElement('ol');
					notes.setAttribute('class', 'notes');
					(this as any).dom.appendChild(notes);
				}
				notes.classList.add(
					'border-t',
					'border-stone-300',
					'dark:border-stone-700',
					'mt-3',
					'pt-3'
				);

				let note = document.createElement('li');
				note.id = id;
				note.classList.add('text-sm');
				note.innerHTML = `<a id="src${id}">${id.split('-')[1]}^</a> ${element.innerHTML}`;
				notes.appendChild(note);
				return content;
			}
		}
	};
}

function createViewerSettings() {
	const store = writable('viewer', {
		viewingDocumentIds: [null],
		individualSettings: []
	} as ViewerSettings);

	function setDocumentId(viewerIndex: number, documentId: number | null) {
		store.update((old) => {
			const current = Array.from(old.viewingDocumentIds) as (number | null)[];
			current[viewerIndex] = documentId;
			return { ...old, viewingDocumentIds: current };
		});
	}

	return { subscribe: store.subscribe, setDocumentId };
}

export const viewerSettings = createViewerSettings();

export function createTeiViewer(
	document: Document,
	viewerElement: HTMLElement,
	behaviour: any = getTranscriptionTEIBehavior()
) {
	var reader = new CETEIcean();
	reader.addBehaviors(behaviour);
	reader.makeHTML5(
		`<TEI version="3.3.0" xmlns="http://www.tei-c.org/ns/1.0">\n${document.body}\n</TEI>`,
		(data: any) => {
			viewerElement.innerHTML = '';
			viewerElement!.appendChild(data);
		}
	);
}
