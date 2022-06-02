export async function fileToBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			resolve(reader.result);
		};
		reader.onerror = function (error) {
			reject();
		};
	});
}

export function base64ToImage(contents: string) {
	const matches = contents.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
	return Buffer.from(matches![2], 'base64');
}
