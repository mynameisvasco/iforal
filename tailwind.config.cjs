const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		{ pattern: /col-span-(.+)/ },
		{ pattern: /bg-(.+)-(.+)/ },
		{ pattern: /text-(.+)-(.+)/ },
		'dropdown-menu-item-disabled',
		'dropdown-menu-item'
	],
	plugins: [require('@tailwindcss/forms')]
};
