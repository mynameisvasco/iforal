import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}

export async function getPrismaClient(userId: number = -1) {
	if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
	return global.prisma || new PrismaClient();
}
