<template>
  <v-app>
    <v-app-bar color="background" :elevation="0">
      <v-spacer />

      <v-btn icon @click="showInfo = true">
        <v-icon>{{ mdiInformationOutline }}</v-icon>
      </v-btn>

      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>{{ mdiTranslate }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-subheader class="text-high-emphasis text-uppercase font-weight-black">{{ t('menuHeaderTranslations') }}</v-list-subheader>
          <v-list-item
            @click="store.setLocale(language.locale)"
            v-for="language in languages"
            :key="`locale-${language.locale}`"
            :value="language.locale">
            <v-list-item-title><span class="me-2">{{ language.flag }}</span> <span>{{ language.name }}</span></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>{{ mdiThemeLightDark }}</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-subheader class="text-high-emphasis text-uppercase font-weight-black">{{ t('menuHeaderTheme') }}</v-list-subheader>
          <v-list-item @click="store.setTheme('light')" :active="store.theme === 'light'">
            <template #prepend>
              <v-icon>{{ mdiWhiteBalanceSunny }}</v-icon>
            </template>
            <v-list-item-title>{{ t('themeLight') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="store.setTheme('dark')" :active="store.theme === 'dark'">
            <template #prepend>
              <v-icon>{{ mdiWeatherNight }}</v-icon>
            </template>
            <v-list-item-title>{{ t('themeDark') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="store.setTheme('system')" :active="store.theme === 'system'">
            <template #prepend>
              <v-icon>{{ mdiDesktopTowerMonitor }}</v-icon>
            </template>
            <v-list-item-title>{{ t('themeSystem') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-dialog v-model="updateExists" width="auto">
      <v-card
        max-width="400"
        :text="t('modalTextUpdateAvailable')"
        :title="t('modalTitleUpdateAvailable')" >
        <template #prepend>
          <v-icon>{{ mdiUpdate }}</v-icon>
        </template>
        <template #actions>
          <v-btn
            class="ms-auto"
            :text="t('buttonUpdate')"
            @click="refreshApp()"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showInfo" width="auto">
      <v-card
        max-width="400"
        :title="t('modalTitleInformation')"
      >
        <template #prepend>
          <v-icon>{{ mdiInformationOutline }}</v-icon>
        </template>
        <v-card-text>
          <div v-html="t('modalTextInformation')" />
        </v-card-text>
        <template #actions>
          <v-btn
            class="ms-auto"
            :text="t('buttonClose')"
            @click="showInfo = false"
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
  import { coreStore } from '@/stores/app'
  import { mdiInformationOutline, mdiDesktopTowerMonitor, mdiWhiteBalanceSunny, mdiWeatherNight, mdiUpdate, mdiThemeLightDark, mdiTranslate } from '@mdi/js'
  import { useLocale, useTheme } from 'vuetify'
  import { useDark } from '@vueuse/core'

  // Composition stuff
  const { current, t } = useLocale()
  const theme = useTheme()
  const isDark = useDark()
  const store = coreStore()

  // Refs
  const registration = ref(function () {
    console.log('dummy SW callback')
  })
  const updateExists = ref(false)
  const showInfo = ref(false)

  // Listen to SW updates
  document.addEventListener('swUpdated', (event: any) => {
    console.log('swUpdated called', event.detail)
    registration.value = event.detail
    updateExists.value = true
  }, { once: true })

  // Available languages
  const languages = [{
    locale: 'en',
    flag: '🇬🇧',
    name: 'British English'
  }, {
    locale: 'de',
    flag: '🇩🇪',
    name: 'Deutsch - Deutschland'
  }]

  // Listen for theme changes in the store
  watchEffect(() => {
    const str = isDark.value ? 'dark' : 'light'

    theme.setTransitionOrigin(document.querySelector('#logo'))
    theme.change(store.storeTheme === 'system' ? str : store.storeTheme)
    store.setSystemTheme(str)
  })
  /** Refresh the PWA and call registration callback */
  function refreshApp () {
    console.log('refreshApp')
    updateExists.value = false
    
    if (registration.value) {
      registration.value()
    }
  }
  // Listen for changes to store locale and update Vuetify current
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
