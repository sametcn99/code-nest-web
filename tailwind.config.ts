import { nextui } from '@nextui-org/theme'
import type { Config } from 'tailwindcss'

/**
 * Import the `flattenColorPalette` function from the `tailwindcss/lib/util/flattenColorPalette` module.
 * This function is used to flatten the color palette object into a single-level object.
 */
const {
	default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

/**
 * Tailwind CSS configuration object.
 */
const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/components/[object Object].js',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			animation: {
				scroll:
					'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
			},
			textColor: {
				muted: 'var(--color-text-muted)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			scale: {
				99: '.99',
				98: '.98',
				97: '.97',
				101: '1.01',
				102: '1.02',
			},
			keyframes: {
				scroll: {
					to: {
						transform: 'translate(calc(-50% - 0.5rem))',
					},
				},
			},
		},
	},
	darkMode: 'class',
	plugins: [
		nextui(),
		addVariablesForColors,
		require('@tailwindcss/typography'),
	],
}

/**
 * Adds CSS variables for colors to the global CSS.
 *
 * @param {Object} options - The options object.
 * @param {Function} options.addBase - The function to add base styles to the global CSS.
 * @param {Function} options.theme - The function to access the theme configuration.
 */
function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme('colors'))
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	)
	addBase({
		':root': newVars,
	})
}
export default config
