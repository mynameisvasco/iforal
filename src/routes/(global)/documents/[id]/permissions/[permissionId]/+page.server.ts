import { formDataToJson } from '$lib/forms';
import { getPrismaClient } from '$lib/prisma';
import { error, type RequestEvent } from '@sveltejs/kit';
import * as Yup from 'yup';

async function update(event: RequestEvent) {
	const permissionId = parseInt(event.params.permissionId ?? '');
	const { data, errors } = await formDataToJson(
		await event.request.formData(),
		Yup.object().shape({
			type: Yup.number().min(0).max(3)
		})
	);

	if (errors) {
		return { errors };
	}

	if (isNaN(permissionId)) {
		throw error(404, 'Permission not found');
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const permission = await prisma.documentPermissions.findUnique({ where: { id: permissionId } });
	if (!permission) {
		throw error(404, 'Permission not found');
	}

	await prisma.documentPermissions.update({
		where: { id: permissionId },
		data: { type: parseInt(data.type) }
	});

	return {};
}

async function destroy(event: RequestEvent) {
	const permissionId = parseInt(event.params.permissionId ?? '');
	if (isNaN(permissionId)) {
		throw error(404, 'Permission not found');
	}

	const prisma = await getPrismaClient(event.locals.user.id);
	const permission = await prisma.documentPermissions.findUnique({ where: { id: permissionId } });
	if (!permission) {
		throw error(404, 'Permission not found');
	}

	await prisma.documentPermissions.delete({ where: { id: permissionId } });
	return {};
}

export const actions = { update, destroy };
