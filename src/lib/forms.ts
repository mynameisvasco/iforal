import type { ObjectSchema, ValidationError } from 'yup';
import type { Result } from './util/api';
import { goto, invalidate } from '$app/navigation';
import { page } from '$app/stores';
import { beforeNavigate } from '$app/navigation';

export async function formDataToJson(
	formData: FormData,
	validationSchema: ObjectSchema<any>
): Promise<Result<any>> {
	const data = {} as any;
	let errors = undefined;
	formData.forEach((value, key) => (data[key] = value));

	try {
		await validationSchema.validate(data, { abortEarly: false });
	} catch (error) {
		errors = {} as any;

		for (const innerError of (error as ValidationError).inner) {
			errors[innerError.path!] = innerError.message;
		}
	}

	return { data, errors, status: errors && Object.keys(errors).length !== 0 ? 400 : 200 };
}

type Destroy = { destroy: () => void };
type Enhance = (form?: HTMLFormElement, redirect?: string) => Destroy;

export const enhance: Enhance = (form, redirect?: string) => {
	let invalidatePath: URL;
	page.subscribe((path) => (invalidatePath = path.url));

	async function handleError(response: Response) {
		const { errors } = (await response.json()) as Result<any>;

		if (errors) {
			for (const input of Array.from(form!.elements)) {
				if (errors[input.id]) {
					const inputErrorLabel =
						document.getElementById(`${input.id}-error-label`) ?? document.createElement('div');

					inputErrorLabel.remove();
					inputErrorLabel.id = `${input.id}-error-label`;
					inputErrorLabel.classList.add('error-label', 'mt-2');
					inputErrorLabel.innerText = errors[input.id];
					input.classList.add('input-error');
					input.parentNode?.append(inputErrorLabel);
				}
			}
		}
	}

	async function handleSuccess() {
		for (const input of Array.from(form!.elements)) {
			input.classList.remove('input-error');
			const inputErrorLabels = document.getElementsByClassName('error-label');

			for (const inputErrorLabel of Array.from(inputErrorLabels)) {
				inputErrorLabel.remove();
			}
		}

		if (redirect) {
			goto(redirect);
		} else {
			const url = new URL(invalidatePath);
			url.search = '';
			url.hash = '';
			invalidate(url.href);
			form!.reset();
		}
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		const response = await fetch(form!.action, {
			method: form!.method,
			headers: { accept: 'application/json' },
			body: new FormData(form)
		});

		if (response.status >= 400) {
			handleError(response);
		} else if (response.status >= 200 && response.status) {
			handleSuccess();
		}
	}

	form!.addEventListener('submit', handleSubmit);

	return {
		destroy() {
			form!.removeEventListener('submit', handleSubmit);
		}
	};
};
