/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { vuetify, i18n } from './vuetify'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Types
import type { App } from 'vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(i18n)
  app.use(pinia)
}
