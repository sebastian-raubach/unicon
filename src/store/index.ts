import { defineStore } from 'pinia'

export const coreStore = defineStore('uniconCore', {
  state: () => {
    return {
      theme: 'system' as string,
      locale: 'en' as string
    }
  },
  actions: {
    setTheme (newTheme: string) {
      this.theme = newTheme
    },
    setLocale (newLocale: string) {
      this.locale = newLocale
    }
  },
  persist: {
    key: 'unicon'
  }
})