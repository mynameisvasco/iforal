import { Role } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { IUser } from 'src/app';

export function requireAdminRole(user: IUser) {
	if (user.role !== Role.Admin) {
		throw redirect(302, '/documents');
	}
}
