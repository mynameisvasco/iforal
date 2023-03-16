import type { Document } from '@prisma/client';
import * as Fs from 'fs/promises';
import * as Path from 'path';
import * as Ejs from 'ejs';

export async function exportTei(document: Document) {
	const templateBuffer = await Fs.readFile(Path.resolve('./src/lib/assets/tei-template.ejs'));
	const template = templateBuffer.toString();
	const compiled = Ejs.render(template, { ...document });
	return compiled;
}

export function stripTeiTags(str: string) {
	return str
		.replace(/<sic>.*<\/sic>/g, '')
		.replace(/<abbr>.*<\/abbr>/g, '')
		.replace(/<note .*>.*<\/note>/g, '')
		.replace(/<[^>]*>/g, '')
		.replace(/\s\s+/g, ' ');
}

export async function importTei() {}
