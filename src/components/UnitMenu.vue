<template>
  <v-menu v-model="menu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" class="h-100" variant="tonal" v-bind="props">
        <span class="d-none d-sm-flex">{{ t('buttonChoose') }}</span> <v-icon>{{ mdiMenuDown }}</v-icon>
      </v-btn>
    </template>

    <v-card min-width="300">
      <v-list open-strategy="single">
        <v-list-group :value="item.name" v-for="item in thisProps.items" :key="`menu-item-${item.name}`">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props"><component :is="item.icon" v-if="item.icon" /> {{ t(item.name) }}</v-list-item>
          </template>

          <template v-if="item.items">
            <v-list-item v-for="subItem in item.items" :key="`sub-item-${item.name}-${subItem.name}`">
              <v-list-item @click="callItem(subItem)"><component :is="subItem.icon" v-if="subItem.icon" /> {{ t(subItem.name) }}</v-list-item>
            </v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-card>
  </v-menu>  
</template>

<script setup lang="ts">
import { mdiMenuDown } from '@mdi/js'
import { ref } from 'vue'
import type { Component } from 'vue'
import { useLocale } from 'vuetify'
// Composition stuff
const { t } = useLocale()

const menu = ref(false)

export interface UnitMenuItem {
  name: string,
  icon?: Component,
  action?: Function,
  items?: UnitMenuItem[]
}

export interface UnitMenuProps {
  name: string,
  icon?: Component,
  items: UnitMenuItem[]
}

const thisProps = defineProps<UnitMenuProps>()

function callItem (item: UnitMenuItem) {
  if (item.action) {
    item.action()
  }
  menu.value = false
}
</script>
