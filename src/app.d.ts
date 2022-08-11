/// <reference types="@sveltejs/kit" />
import type { Role } from '@prisma/client';

declare global {
	declare namespace App {
		interface Locals {
			user: {
				id: number;
				name: string;
				email: string;
				role: Role;
			};
		}

		interface Session {
			id: number;
			name: string;
			email: string;
			role: Role;
		}
	}
}
