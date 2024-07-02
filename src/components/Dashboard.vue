<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="min(100%, 900px)"
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

                  <div class="d-flex flex-wrap" v-if="converted && converted.converted && converted.conversions && converted.conversions.length > 0">
                    <v-chip color="primary" variant="outlined" label v-for="c in converted.conversions" :key="`converted-${c.name}`" class="wrap-chip me-2">
                      <h4>{{ t(c.name) }}</h4>
                      <p>{{ n(c.value) }}</p>
                    </v-chip>
                  </div>
                  <div class="d-flex flex-wrap" v-else-if="converted && !converted.converted && converted.duplicateMatches && converted.duplicateMatches.length > 0">
                    <v-chip :color="colors.yellow.darken2"
                            variant="outlined"
                            label
                            v-for="c in converted.duplicateMatches"
                            :key="`converted-duplicates-${c.name}`"
                            class="wrap-chip me-2"
                            @click="setInput(c)">
                      <h4>{{ t(c.name) }}</h4>
                    </v-chip>
                  </div>
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

import { Pound } from '@/plugins/conversion/weight/Pound'
import { Stone } from '@/plugins/conversion/weight/Stone'
import { Kilogram } from '@/plugins/conversion/weight/Kilogram'
import { Meter } from '@/plugins/conversion/distance/Meter'
import { Foot } from '@/plugins/conversion/distance/Foot'
import { Yard } from '@/plugins/conversion/distance/Yard'
import { Mile } from '@/plugins/conversion/distance/Mile'
import { Liter } from '@/plugins/conversion/volume/Liter'
import { CubicMeter } from '@/plugins/conversion/volume/CubicMeter'
import { GallonUk } from '@/plugins/conversion/volume/GallonUk'
import { GallonUs } from '@/plugins/conversion/volume/GallonUs'
import { PintUk } from '@/plugins/conversion/volume/PintUk'
import { PintUs } from '@/plugins/conversion/volume/PintUs'

import colors from 'vuetify/util/colors'

import { ref, computed } from 'vue'

import { useLocale } from 'vuetify'
const { t, n } = useLocale()

const mapping = new Map<string, Unit[]>()
const units: Unit[] = []
function addToMapping (unit: Unit): void {
  units.push(unit)
  unit.abbreviations.forEach(ab => {
    const lower = ab.toLowerCase()
    if (mapping.has(lower)) {
      mapping.get(lower)?.push(unit)
    } else {
      mapping.set(lower, [unit])
    }
  })
}

addToMapping(new Pound())
addToMapping(new Stone())
addToMapping(new Kilogram())
addToMapping(new Meter())
addToMapping(new Foot())
addToMapping(new Yard())
addToMapping(new Mile())
addToMapping(new Liter())
addToMapping(new CubicMeter())
addToMapping(new GallonUk())
addToMapping(new GallonUs())
addToMapping(new PintUk())
addToMapping(new PintUs())

const input = ref<string>()

function setInput (unit: Unit): void {
  const [first, ...second] = input.value.split(' ')

  input.value = `${first} ${unit.primaryAbbreviation}`
}

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
      return t('formFeedbackNotANumber')
    }
    if (second.length < 1 || second[0].length < 1) {
      return t('formFeedbackUnitMissing')
    }
  }

  return true
}

const converted = computed(() => {
  if (input.value !== undefined && input.value !== null && input.value.length > 0) {
    const [first, ...second]: string[] = input.value.split(' ')

    if (isNumeric(first) && second.length > 0 && second[0].length > 0) {
      const match: Unit[] | undefined = mapping.get(second.map(s => s.trim()).join(' ').toLowerCase())

      if (match && match.length > 0) {
        if (match.length > 1) {
          return {
            converted: false,
            duplicateMatches: match,
            conversions: []
          }
        } else {
          const si = match[0].toSiUnit(+first)

          const result: any[] = []

          const others = units.filter((u: Unit) => u.type === match[0].type)

          others.forEach(o => {
            result.push({
              name: o.name,
              value: o.fromSiUnit(si)
            })
          })

          return {
            converted: true,
            duplicateMatches: [],
            conversions: result
          }
        }
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
