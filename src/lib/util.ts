import { browser } from '$app/environment';
import type { Tag } from '@prisma/client';
import { isDate } from 'date-fns';

export function disableScrolling() {
	if (browser) {
		let x = window.scrollX;
		let y = window.scrollY;

		window.onscroll = function () {
			window.scrollTo(x, y);
		};
	}
}

export function enableScrolling() {
	if (browser) {
		window.onscroll = function () {};
	}
}

export function replaceRange(s: string, start: number, end: number, substitute: string) {
	return s.substring(0, start) + substitute + s.substring(end);
}

export function transformAllDatesToString(obj: any): any {
	if (Array.isArray(obj)) {
		for (const element of obj) {
			return transformAllDatesToString(element);
		}
	}

	for (const key in obj) {
		if (isDate(obj[key])) {
			obj[key] = obj[key].toISOString();
		} else if (obj[key].constructor === Object || Array.isArray(obj[key])) {
			transformAllDatesToString(obj[key]);
		}
	}
}

export function tagToString(tag: Tag, inner: string) {
	const attributes = (tag.attributes as any[]).map((a) => a.name + '=""').join(' ');

	if (tag.isChildAllowed) {
		return `<${tag.name} ${attributes}>${inner}</${tag.name}>`;
	} else {
		return `<${tag.name} ${attributes}/>${inner}`;
	}
}
