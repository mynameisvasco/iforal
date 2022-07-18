import type { ObjectSchema, ValidationError } from 'yup';
import { goto, invalidate } from '$app/navigation';
import { page } from '$app/stores';
import { modals, type Modal } from './components/stores/modals';
import type { Result } from './api';

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

export const enhance = (form: HTMLFormElement, options?: { redirect: string }) => {
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
					input.parentNode?.append(inputErrorLabel);
					input.classList.add('input-error');
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

		if (options?.redirect) {
			await goto('/documents');
		} else {
			const url = new URL(invalidatePath);
			url.search = '';
			url.hash = '';
			form!.reset();
			await invalidate(url.href);
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

export const draft = (form: HTMLFormElement, modal: Modal) => {
	const inputs = Array.from(form.elements).filter((i) => i.id) as HTMLInputElement[];
	let hasDraft = inputs.map((i) => !!localStorage.getItem(`${form.id}-${i.id}`)).find((i) => true);

	function handleSubmit(event: any) {
		inputs.forEach((i) => localStorage.removeItem(`${form.id}-${i.id}`));
	}

	function handleChange(event: any) {
		localStorage.setItem(`${form.id}-${event.target.id}`, event.target.value);
	}

	if (modal && hasDraft) {
		modals.open({
			...modal,
			onAction: () =>
				inputs.forEach((i) => (i.value = localStorage.getItem(`${form.id}-${i.id}`) ?? i.value)),
			onCancel: () => inputs.forEach((i) => localStorage.removeItem(`${form.id}-${i.id}`))
		});
	} else if (hasDraft) {
		for (const input of inputs) {
			input.value = localStorage.getItem(`${form.id}-${input.id}`) ?? '';
		}
	}

	form.addEventListener('submit', handleSubmit);

	for (const input of inputs) {
		input.addEventListener('change', handleChange);
	}

	return {
		destroy() {
			form.removeEventListener('submit', handleSubmit);

			for (const input of inputs) {
				input.removeEventListener('change', handleChange);
			}
		}
	};
};
