const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	safelist: [
		{ pattern: /col-span-(.+)/ },
		{ pattern: /bg-(.+)-(.+)/ },
		{ pattern: /text-(.+)-(.+)/ },
		'dropdown-menu-item-disabled',
		'dropdown-menu-item'
	],
	plugins: [require('@tailwindcss/forms')]
};
