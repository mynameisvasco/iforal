import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPrismaClient(userId: number = -1) {
	return prisma;
}
