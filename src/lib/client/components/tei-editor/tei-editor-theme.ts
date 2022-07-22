import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import type { Extension } from '@codemirror/state';

const lightChalky = 'rgb(253 186 116)',
	darkChalky = 'rgb(194 65 12)',
	lightCoral = 'rgb(153 246 228)',
	darkCoral = 'rgb(14 116 144)',
	lightIvory = 'rgb(245 245 244)',
	darkIvory = 'rgb(68 64 60)',
	lightStone = 'rgb(168 162 158)',
	darkStone = 'rgb(163 163 163)',
	darkBackground = 'rgb(41 37 36)',
	highlightBackground = '#2c313a',
	background = 'rgb(255, 255, 255)',
	selection = 'rgb(68 64 60)',
	lightCursor = 'rbg(245 245 244)',
	darkCursor = 'rgb(64 64 64)';

export const editorDarkThemeDefinition = EditorView.theme(
	{
		'&': {
			color: lightIvory,
			backgroundColor: darkBackground
		},

		'.cm-content': {
			caretColor: lightCursor
		},

		'.cm-cursor, .cm-dropCursor': { borderLeftColor: lightCursor },
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
			backgroundColor: selection
		},

		'.cm-gutters': {
			backgroundColor: darkBackground,
			color: lightStone,
			'border-right': `1px solid ${lightStone}`
		},

		'.cm-tooltip': {
			border: lightIvory,
			backgroundColor: darkIvory,
			'border-radius': '10px'
		},
		'.cm-tooltip .cm-tooltip-arrow:before': {
			borderTopColor: 'transparent',
			borderBottomColor: 'transparent'
		},
		'.cm-tooltip .cm-tooltip-arrow:after': {
			borderTopColor: darkIvory,
			borderBottomColor: darkIvory
		},
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: lightChalky,
				color: darkIvory
			}
		}
	},
	{ dark: true }
);

export const editorLightThemeDefinition = EditorView.theme(
	{
		'&': {
			fontSize: '20px',
			color: darkIvory,
			backgroundColor: background
		},

		'.cm-content': {
			caretColor: darkCursor
		},

		'.cm-cursor, .cm-dropCursor': { borderLeftColor: lightCursor },
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
			backgroundColor: selection
		},

		'.cm-gutters': {
			backgroundColor: background,
			color: darkStone,
			'border-right': `1px solid ${darkStone}`
		},

		'.cm-tooltip': {
			border: darkIvory,
			backgroundColor: lightIvory,
			'border-radius': '10px'
		},
		'.cm-tooltip .cm-tooltip-arrow:before': {
			borderTopColor: darkIvory,
			borderBottomColor: darkIvory
		},
		'.cm-tooltip .cm-tooltip-arrow:after': {
			borderTopColor: darkIvory,
			borderBottomColor: darkIvory
		},
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: darkBackground,
				color: lightIvory
			}
		}
	},
	{ dark: false }
);

/// The highlighting style for code in the One Dark theme.
export const editorDarkHighlightStyle = HighlightStyle.define([
	{ tag: [t.string], color: lightChalky },
	{ tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: lightCoral },
	{
		tag: [
			t.typeName,
			t.className,
			t.number,
			t.changed,
			t.annotation,
			t.modifier,
			t.self,
			t.namespace
		],
		color: lightChalky
	},

	{ tag: [t.meta, t.comment], color: lightStone }
]);

export const editorLightHighlightStyle = HighlightStyle.define([
	{ tag: [t.string], color: darkChalky },
	{ tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName], color: darkCoral },
	{
		tag: [
			t.typeName,
			t.className,
			t.number,
			t.changed,
			t.annotation,
			t.modifier,
			t.self,
			t.namespace
		],
		color: darkChalky
	},

	{ tag: [t.meta, t.comment], color: lightStone }
]);

export const editorDarkTheme: Extension = [
	editorDarkThemeDefinition,
	syntaxHighlighting(editorDarkHighlightStyle)
];

export const editorLightTheme: Extension = [
	editorLightThemeDefinition,
	syntaxHighlighting(editorLightHighlightStyle)
];
