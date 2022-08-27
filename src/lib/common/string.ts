import { isDate } from 'date-fns';

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
