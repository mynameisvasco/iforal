import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, Plugin } from 'vite';
import { createWebSocketServer } from './src/lib/server/websocket/websocket';

const websocketPlugin: Plugin = {
	name: 'websocket-server',
	configureServer: (server) => {
		createWebSocketServer(server.httpServer!);
	}
};

export default defineConfig({
	plugins: [sveltekit(), websocketPlugin]
});
