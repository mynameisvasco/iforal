import { authenticate } from '../../../lib/server/websocket/websocket';
import type { Server as WebSocketServer, Socket } from 'socket.io';
import { redis } from '../../../lib/server/redis';

async function handleJoin(server: WebSocketServer, client: Socket, data: any) {
	const { documentId } = data;
	const room = `document:${documentId}`;
	const currentUsers = JSON.parse((await redis.get(`document:${documentId}:users`)) ?? '[]');
	await client.join(room);
	console.log(room);
	await redis.set(client.id, documentId);
	server.sockets.in(room).emit('joined', { currentUsers });
	await redis.lPush(`document:${documentId}:users`, JSON.stringify(client.data.user));
}

async function handleDisconnect(server: WebSocketServer, client: Socket) {
	const documentId = await redis.getDel(client.id);
	await redis.lRem(`document:${documentId}:users`, 1, JSON.stringify(client.data.user));
}

export async function documentsWs(webSocketServer: WebSocketServer) {
	const namespace = webSocketServer.of('/documents');

	namespace.use(authenticate).on('connection', (client) => {
		client.on('join', (data) => handleJoin(webSocketServer, client, data));
		client.on('disconnect', () => handleDisconnect(webSocketServer, client));
	});
}
