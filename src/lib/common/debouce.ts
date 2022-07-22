export function debounce(func: Function, timeout = 500) {
	let timer: NodeJS.Timer;

	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => func.apply(null, args), timeout);
	};
}
