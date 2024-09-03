import { defineStore } from 'pinia'

export const coreStore = defineStore('uniconCore', {
  state: () => {
    return {
      theme: 'system' as string,
      locale: 'en' as string,
      recentSearches: [] as string[]
    }
  },
  actions: {
    setTheme (newTheme: string) {
      this.theme = newTheme
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
