import { EditorUtils } from '$lib/util';
import type { Document } from '@prisma/client';
import { writable } from 'svelte-local-storage-store';
//@ts-ignore
import CETEIcean from 'CETEIcean';
import { vi } from 'date-fns/locale';

export interface ViewerIndividualSettings {
	fontSize: number;
	isTranscription: boolean;
}

export interface ViewerSettings {
	viewingDocumentIds: (number | null)[];
	viewersCount: number;
	individualSettings: ViewerIndividualSettings[];
}

function getEditionTEIBEhaviour() {
	return {
		tei: {
			expan: (element: HTMLElement) => {
				element.classList.add('hidden');
			},
			sic: (element: HTMLElement) => {
				element.classList.add('text-red-800', 'dark:text-red-300');
				element.style.textDecoration = 'line-through';
			},
			corr: (element: HTMLElement) => {
				element.classList.add('text-green-800', 'dark:text-green-300');
			},
			pb: (element: HTMLElement) => {}
		}
	};
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
			pb: (element: HTMLElement) => {}
		}
	};
}

function createViewerSettings() {
	const store = writable('viewer', {
		viewingDocumentIds: [],
		viewersCount: 1,
		individualSettings: []
	} as ViewerSettings);

	function increaseViewersCount() {
		store.update((old) => ({ ...old, viewersCount: Math.min(3, old.viewersCount + 1) }));
	}

	function decreaseViewersCount() {
		store.update((old) => ({ ...old, viewersCount: Math.max(1, old.viewersCount - 1) }));
	}

	function setDocumentId(viewerIndex: number, documentId: number | null) {
		store.update((old) => {
			const current = Array.from(old.viewingDocumentIds) as (number | null)[];
			current[viewerIndex] = documentId;
			return { ...old, viewingDocumentIds: current };
		});
	}

	return { subscribe: store.subscribe, increaseViewersCount, decreaseViewersCount, setDocumentId };
}

export const viewerSettings = createViewerSettings();

export function createTeiViewer(document: Document, viewerElement: HTMLElement) {
	var reader = new CETEIcean();
	reader.addBehaviors(getTranscriptionTEIBehavior());
	reader.makeHTML5(
		`<TEI version="3.3.0" xmlns="http://www.tei-c.org/ns/1.0">\n${document.body}\n</TEI>`,
		(data: any) => {
			viewerElement.innerHTML = '';
			viewerElement!.appendChild(data);
		}
	);
}
