<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-img
        class="mb-4"
        height="150"
        src="@/assets/logo.svg"
      />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">{{ t('pageHomeLogoWelcome') }}</div>

        <h1 class="text-h2 font-weight-bold title">UNI</h1>
        <h1 class="text-h2 font-weight-bold title text-rotated">CON</h1>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="12">
          <v-card
            class="py-4"
            color="surface-variant"
            prepend-icon="mdi-arrow-decision"
            rounded="lg"
            variant="outlined"
          >

            <template #title>
              <h2 class="text-h5 font-weight-bold">{{ t('pageHomeCardTitle') }}</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                <v-form @submit.prevent validate-on="input">
                  <v-text-field :label="t('formLabelHomeInput')" v-model="input" required :rules="[isValid]"></v-text-field>

                  <template v-if="converted">
                    <v-chip color="primary" variant="outlined" label v-for="c in converted" :key="`converted-${c.name}`" class="me-3 wrap-chip">
                      <h4>{{ t(c.name) }}</h4>
                      <p>{{ n(c.value) }}</p>
                    </v-chip>
                  </template>
                </v-form>
              </div>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { Unit } from '@/plugins/conversion/Unit'
import { WeightUnit } from '@/plugins/conversion/WeightUnit'
import { DistanceUnit } from '@/plugins/conversion/DistanceUnit'

import { Pound } from '@/plugins/conversion/weight/Pound'
import { Stone } from '@/plugins/conversion/weight/Stone'
import { Kilogram } from '@/plugins/conversion/weight/Kilogram'
import { Meter } from '@/plugins/conversion/distance/Meter'
import { Foot } from '@/plugins/conversion/distance/Foot'
import { Mile } from '@/plugins/conversion/distance/Mile'

import { ref, computed } from 'vue'

import { useLocale } from 'vuetify'
const { t, n } = useLocale()

const unitTypes: Array<any> = [WeightUnit, DistanceUnit]

const mapping = new Map<string, Unit>()
let w: WeightUnit = new Pound()
w.abbreviations.forEach(ab => mapping.set(ab, w))
w = new Stone()
w.abbreviations.forEach(ab => mapping.set(ab, w))
w = new Kilogram()
w.abbreviations.forEach(ab => mapping.set(ab, w))
w = new Meter()
w.abbreviations.forEach(ab => mapping.set(ab, w))
w = new Foot()
w.abbreviations.forEach(ab => mapping.set(ab, w))
w = new Mile()
w.abbreviations.forEach(ab => mapping.set(ab, w))

const input = ref<string>()

function isNumeric (value?: string | number): boolean {
  return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())))
}

function isValid (value?: string): boolean | string {
  if (value === undefined || value === null || value.length < 1) {
    return ''
  } else {
    const [first, ...second] = value.split(' ')

    if (!isNumeric(first)) {
      return 'Not a number'
    }
    if (second.length < 1 || second[0].length < 1) {
      return 'Unit missing'
    }
  }

  return true
}

const converted = computed(() => {
  if (input.value !== undefined && input.value !== null && input.value.length > 0) {
    const [first, ...second]: string[] = input.value.split(' ')

    if (isNumeric(first) && second.length > 0 && second[0].length > 0) {
      const match = mapping.get(second[0].trim())

      if (match) {
        const si = match.toSiUnit(+first)

        const result: any[] = []

        unitTypes.forEach(T => {
          console.log(T, match instanceof T)
          if (match instanceof T) {
            const others = [...new Set(Array.from(mapping.values()).filter((u: Unit) => u instanceof T))]

            others.forEach(o => {
              result.push({
                name: o.name,
                value: o.fromSiUnit(si)
              })
            })
          }
        })

        return result
      } else {
        return null
      }
    } else {
      return null
    }
  } else {
    return null
  }
})
</script>

<style scoped>
.title {
  font-family: "Noto Sans Mono", monospace;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}
.text-rotated {
  -moz-transform: scale(-1, -1);
  -webkit-transform: scale(-1, -1);
  -o-transform: scale(-1, -1);
  -ms-transform: scale(-1, -1);
  transform: scale(-1, -1);
}
</style>

<style>
.v-chip.wrap-chip {
  height: unset !important;
}
.v-chip.wrap-chip .v-chip__content {
  display: block;
  padding: 0.4em;
}
</style>
