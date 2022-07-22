import { Server as WebSocketServer, Socket } from 'socket.io';
import type { Server } from 'http';
import { useDocumentsNamespace } from './documents-namespace';
import * as Cookie from 'cookie';
import Jwt from 'jsonwebtoken';

export async function createWebSocketServer(server: Server) {
	const webSocketServer = new WebSocketServer(server);
	useDocumentsNamespace(webSocketServer);
}

export function authenticate(client: Socket, next: any) {
	const cookiesHeader = client.handshake.headers.cookie;
	const cookies = Cookie.parse(cookiesHeader ?? '');

	if (cookies.accessToken) {
		client.data.user = Jwt.verify(cookies.accessToken, '1h29r781gf987ubg198723ghd182') as any;
	}

	const isAuthed = !!client.data.user;

	if (!isAuthed) {
		next(new Error('forbidden'));
	}

	next();
}
