import { browser } from '$app/env';

export function disableScrolling() {
	if (browser) {
		let x = window.scrollX;
		let y = window.scrollY;

		window.onscroll = function () {
			window.scrollTo(x, y);
		};
	}
}

export function enableScrolling() {
	if (browser) {
		window.onscroll = function () {};
	}
}
