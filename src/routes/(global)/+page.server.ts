import { redirect } from '@sveltejs/kit';

export async function load() {
	console.log(12);
	throw redirect(301, '/documents');
}
