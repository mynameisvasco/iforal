/// <reference types="@sveltejs/kit" />
import type { Role } from '@prisma/client';

interface IUser {
	id: number;
	name: string;
	email: string;
	role: Role;
}

declare global {
	declare namespace App {
		interface Locals {
			user: IUser;
		}
	}
}
