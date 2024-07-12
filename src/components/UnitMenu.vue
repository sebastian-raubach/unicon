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
            <v-list-item v-bind="props"><v-icon v-if="item.icon">{{ item.icon }}</v-icon> {{ t(item.name) }}</v-list-item>
          </template>

          <template v-if="item.items">
            <v-list-item variant="tonal" :class="subItem.isSiUnit ? 'border-e-lg border-primary' : ''" v-for="subItem in item.items" :key="`sub-item-${item.name}-${subItem.name}`" @click="callItem(subItem)"><v-icon v-if="subItem.icon">{{ subItem.icon }}</v-icon> {{ t(subItem.name) }}</v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-card>
  </v-menu>  
</template>

<script setup lang="ts">
import { mdiMenuDown } from '@mdi/js'
import { ref } from 'vue'
import { useLocale } from 'vuetify'
// Composition stuff
const { t } = useLocale()

const menu = ref(false)

export interface UnitMenuItem {
  name: string,
  icon?: string,
  isSiUnit?: boolean,
  action?: Function,
  items?: UnitMenuItem[]
}

export interface UnitMenuProps {
  name: string,
  icon?: string,
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
