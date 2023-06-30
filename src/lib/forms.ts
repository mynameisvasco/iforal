import type { ObjectSchema, ValidationError } from 'yup';
import { goto, invalidateAll } from '$app/navigation';
import { modals, type Modal } from '$stores/modals';
import type { ActionResult } from '@sveltejs/kit';
import { notifications, type Notification } from '$stores/notifications';
import { applyAction } from '$app/forms';

export async function formDataToJson(
	formData: FormData,
	validationSchema: ObjectSchema<any>
): Promise<any> {
	const data = {} as any;
	let errors = undefined;

	formData.forEach((value, key) => {
		if (/^\d+$/.test(value as string)) {
			data[key] = Number.parseInt(value as string);
		} else {
			data[key] = value;
		}
	});

	try {
		await validationSchema.validate(data, { abortEarly: false });
	} catch (error) {
		errors = {} as any;

		for (const innerError of (error as ValidationError).inner) {
			errors[innerError.path!] = innerError.message;
		}
	}

	return { data, errors };
}

export const formHandler = (
	notification?: Notification,
	cleanForm: boolean = false,
	after?: () => void
) => {
	return ({ data, form }: { data: any; form: HTMLFormElement }) =>
		async ({ result }: { result: ActionResult }) => {
			let errors = {} as any;

			if (result.type === 'failure') {
				errors = result.data!.errors;
			}

			for (const input of Array.from(form!.elements)) {
				if (result.type === 'failure' && errors[input.id]) {
					const labelId = `${input.id}-error-label`;
					const label = document.getElementById(labelId) ?? document.createElement('div');
					label.remove();
					label.id = `${input.id}-error-label`;
					label.classList.add('error-label', 'mt-2');
					label.innerText = errors[input.id];
					input.parentNode?.append(label);
					input.classList.add('input-error');
				} else {
					const labelId = `${input.id}-error-label`;
					const label = document.getElementById(labelId);
					label?.remove();
					input.classList.remove('input-error');
				}
			}

			if (result.type === 'failure') {
				return;
			}

			if (result.type === 'redirect') {
				return await goto(result.location);
			}

			if (notification) {
				notifications.show(notification);
			}

			if (cleanForm) {
				form.reset();
			}

			await invalidateAll();
			await applyAction(result);
			after && after();
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
