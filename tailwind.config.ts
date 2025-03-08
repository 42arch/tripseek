import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
  	extend: {
  		colors: {
  			main: 'var(--main)',
  			overlay: 'var(--overlay)',
  			bg: 'var(--bg)',
  			bw: 'var(--bw)',
  			blank: 'var(--blank)',
  			text: 'var(--text)',
  			mtext: 'var(--mtext)',
  			border: 'var(--border)',
  			ring: 'var(--ring)',
  			ringOffset: 'var(--ring-offset)',
  			secondaryBlack: '#212121'
  		},
  		borderRadius: {
  			base: '0px'
  		},
  		boxShadow: {
  			shadow: 'var(--shadow)'
  		},
  		translate: {
  			boxShadowX: '5px',
  			boxShadowY: '4px',
  			reverseBoxShadowX: '-5px',
  			reverseBoxShadowY: '-4px'
  		},
  		fontWeight: {
  			base: '500',
  			heading: '700'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    iconsPlugin({
      collections: getIconCollections(['fluent-emoji', 'lucide'])
    })
  ]
} satisfies Config

export default config
