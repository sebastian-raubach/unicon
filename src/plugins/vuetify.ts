/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'vuetify/styles'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

import enGB from '@/plugins/i18n/en_GB.json'
import deDE from '@/plugins/i18n/de_DE.json'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { createI18n, useI18n } from 'vue-i18n'
import { en, de } from 'vuetify/locale'

enGB.$vuetify = en
deDE.$vuetify = de

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enGB,
    de: deDE
  },
  legacy: false,
  globalInjection: true
})

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#c66268',
          background: '#ffede0'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#ff7373',
          background: '#00121f'
        }
      }
    }
  },
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  }
})

export {
  vuetify,
  i18n
} 
