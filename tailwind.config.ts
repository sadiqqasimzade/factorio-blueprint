import type { Config } from "tailwindcss"

export default {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./utils/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				bgDark: 'hsl(237 80% 3%)',
				bg: 'hsl(231 58% 6%)',
				bgLight: 'hsl(229 39% 11%)',
				bgLighter: 'hsl(229 39% 15%)',
			},
			
			animation: {	
				'sequencer-step': 'sequencer-step 2s ease-in-out infinite',
			},
			keyframes: {
				'sequencer-step': {
					'0%': { backgroundColor: 'rgba(16, 185, 129, 0.2)', transform: 'scale(1)' },
					'25%': { backgroundColor: 'rgba(16, 185, 129, 0.6)', transform: 'scale(1.1)' },
					'50%': { backgroundColor: 'rgba(16, 185, 129, 1)', transform: 'scale(1.2)', boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)' },
					'75%': { backgroundColor: 'rgba(16, 185, 129, 0.6)', transform: 'scale(1.1)' },
					'100%': { backgroundColor: 'rgba(16, 185, 129, 0.2)', transform: 'scale(1)' },
				}
			}

		}

	},
} satisfies Config
