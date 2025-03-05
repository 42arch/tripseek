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
