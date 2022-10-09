import { browser } from '$app/environment';
import type { Tag } from '@prisma/client';
import { isDate } from 'date-fns';

export class ScrollUtils {
	public static disableScrolling() {
		if (browser) {
			let x = window.scrollX;
			let y = window.scrollY;

			window.onscroll = function () {
				window.scrollTo(x, y);
			};
		}
	}

	public static enableScrolling() {
		if (browser) {
			window.onscroll = function () {};
		}
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

export class EditorUtils {
	public static tagToString(tag: Tag, inner: string) {
		const attributes = (tag.attributes as any[]).map((a) => a.name + '=""').join(' ');
		const attributesWithSpaces = attributes === '' ? '' : ' ' + attributes;
		if (tag.isChildAllowed) {
			return `<${tag.name}${attributesWithSpaces}>${inner}</${tag.name}>`;
		} else {
			return `<${tag.name} ${attributesWithSpaces}/>${inner}`;
		}
	}

	public static addTeiBeginTag(inner: string) {
		return `<TEI version="3.3.0" xmlns="http://www.tei-c.org/ns/1.0">\n${inner}\n</TEI>`;
	}

	public static getTEIBehavior() {
		return {
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
		};
	}
}
