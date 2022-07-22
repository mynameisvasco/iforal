import type { Server as WebSocketServer } from 'socket.io';
import { authenticate } from './websocket';

export async function useDocumentsNamespace(webSocketServer: WebSocketServer) {
	const namespace = webSocketServer.of('/documents');

	namespace.use(authenticate).on('connection', (client) => {
		console.log(12);
	});
}
