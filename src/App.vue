<template>
  <v-app>
    <v-app-bar color="background" :elevation="0">
      <v-spacer></v-spacer>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="store.setLocale(language.locale)"
            v-for="language in languages"
            :key="`locale-${language.flag}`"
            :value="language.locale">
            <v-list-item-title>{{ language.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
            :active="item.value === store.theme"
            @click="store.setTheme(item.value)"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-dialog v-model="updateExists" width="auto">
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        :text="t('modalTextUpdateAvailable')"
        :title="t('modalTitleUpdateAvailable')" >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            :text="t('buttonUpdate')"
            @click="refreshApp()"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-main>
      <Dashboard />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { coreStore } from '@/store'
import { watch, ref, watchEffect, computed } from 'vue'

import { useLocale, useTheme } from 'vuetify'
const { current, t } = useLocale()
const theme = useTheme()
const store = coreStore()

const registration = ref(function () { console.log('dummy SW callback') })
const updateExists = ref(false)

// Listen to SW updates
document.addEventListener('swUpdated', (event: any) => {
  console.log('swUpdated called', event.detail)
  registration.value = event.detail
  updateExists.value = true
}, { once: true })

const languages = [{
  locale: 'en',
  flag: 'gb',
  name: 'British English'
}, {
  locale: 'de',
  flag: 'de',
  name: 'Deutsch - Deutschland'
}]

const items = computed(() => {
  return [
    {
      text: t('themeLight'),
      icon: 'mdi-white-balance-sunny',
      value: 'light',
    },
    {
      text: t('themeDark'),
      icon: 'mdi-weather-night',
      value: 'dark',
    },
    {
      text: t('themeSystem'),
      icon: 'mdi-desktop-tower-monitor',
      value: 'system',
    },
  ]
})

const systemTheme = ref('dark')

let media: MediaQueryList

watch(() => store.theme, (value: string) => {
  if (value === 'system') {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', onThemeChange)
    onThemeChange()
  } else if (media) {
    media.removeEventListener('change', onThemeChange)
  }
}, { immediate: true })
function onThemeChange () {
  systemTheme.value = media!.matches ? 'dark' : 'light'
}
function refreshApp () {
  console.log('refreshApp')
  updateExists.value = false
  
  if (registration.value) {
    registration.value()
  }
}
watchEffect(() => {
  theme.global.name.value = (
    store.theme === 'system' ? systemTheme.value : store.theme
  )
})
watchEffect(() => {
  current.value = store.locale
})
</script>

<style scoped>
.app-copy {
  position: fixed !important;
  z-index: -1 !important;
  pointer-events: none !important;
  contain: size style !important;
  overflow: clip !important;
}

.app-transition {
  --clip-size: 0;
  --clip-pos: 0 0;
  clip-path: circle(var(--clip-size) at var(--clip-pos));
  transition: clip-path .35s ease-out;
}
</style>
