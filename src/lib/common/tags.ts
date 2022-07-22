import type { Tag } from '@prisma/client';

export function tagToString(tag: Tag, inner: string) {
	const attributes = (tag.attributes as any[]).map((a) => a.name + '=""').join(' ');

	if (tag.isChildAllowed) {
		return `<${tag.name} ${attributes}>${inner}</${tag.name}>`;
	} else {
		return `<${tag.name} ${attributes}/>${inner}`;
	}
}
