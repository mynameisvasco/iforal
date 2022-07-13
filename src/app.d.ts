/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		user: {
			id: number;
			name: string;
			email: string;
		};
	}

	interface Session {
		id: number;
		name: string;
		email: string;
	}
	// interface Platform {}
	// interface Stuff {}
}
