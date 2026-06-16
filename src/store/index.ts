import { defineStore } from 'pinia'

export const coreStore = defineStore('uniconCore', {
  state: () => {
    return {
      systemTheme: 'dark',
      theme: 'light',
      locale: 'en' as string,
      darkMode: null as (boolean | null),
      recentSearches: [] as string[]
    }
  },
  getters: {
    storeDarkMode: (state): boolean | null => state.darkMode,
    storeTheme: (state): string => state.theme,
    storeIsDarkMode: (state): boolean => (state.theme === 'system' ? state.systemTheme : state.theme) === 'dark',
    storeSystemTheme: (state): string => state.systemTheme || 'dark',
  },
  actions: {
    setSystemTheme (newSystemTheme: string) {
      this.systemTheme = newSystemTheme
    },
    setTheme (newTheme: string) {
      this.theme = newTheme

      if (newTheme !== 'system') {
        this.setDarkMode(newTheme === 'dark')
      }
    },
    setDarkMode (newDarkMode: boolean) {
      this.darkMode = newDarkMode
    },
    setLocale (newLocale: string) {
      this.locale = newLocale
    },
    addRecentSearch (item: string) {
      const index = this.recentSearches.indexOf(item)
      if (index !== -1) {
        this.recentSearches.splice(index, 1)
      }
      this.recentSearches.unshift(item)
      if (this.recentSearches.length > 3) {
        this.recentSearches = this.recentSearches.slice(0, 3)
      }
    },
    setRecentSearches (recentSearches: string[]) {
      this.recentSearches = recentSearches
    }
  },
  persist: {
    key: 'unicon'
  }
})
