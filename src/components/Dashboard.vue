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
            rounded="lg"
            variant="outlined"
          >
            <template v-slot:prepend>
              <v-icon>{{ mdiArrowDecision }}</v-icon>
            </template>

            <template #title>
              <h2 class="text-h5 font-weight-bold">{{ t('pageHomeCardTitle') }}</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                <v-form @submit.prevent validate-on="input">
                  <v-text-field :label="t('formLabelHomeInput')" :placeholder="$t('formPlaceholderHomeInput')" v-model="input" required :rules="[isValid]"></v-text-field>

                  <template v-if="conversionStatus">
                    <TimezoneMap :dateConfig="conversionStatus.dateConfig" class="mt-3" v-if="conversionStatus.dateConfig" />
                    <div class="d-flex flex-wrap conversion-gap" v-else-if="conversionStatus.converted && conversionStatus.conversions && conversionStatus.conversions.length > 0">
                      <v-chip color="primary" label v-for="c in conversionStatus.conversions" :key="`converted-${c.name}`" class="wrap-chip">
                        <div class="d-flex flex-wrap conversion-gap">
                          <div v-for="sub in c.value" :key="`converted-sub-${c.name}-${sub.unitName}`">
                            <h4>{{ t(sub.unitName) }}</h4>
                            <p>{{ n(sub.conversionValue) }}</p>
                          </div>
                        </div>
                      </v-chip>
                    </div>
                    <div class="d-flex flex-wrap conversion-gap" v-else-if="!conversionStatus.converted && conversionStatus.duplicateMatches && conversionStatus.duplicateMatches.length > 0">
                      <v-chip :color="colors.yellow.darken2"
                              label
                              v-for="c in conversionStatus.duplicateMatches"
                              :key="`converted-duplicates-${c.name}`"
                              class="wrap-chip"
                              @click="setInput(c)">
                        <h4>{{ t(c.name) }}</h4>
                      </v-chip>
                    </div>
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

import { Ounce } from '@/plugins/conversion/weight/Ounce'
import { Pound } from '@/plugins/conversion/weight/Pound'
import { Stone } from '@/plugins/conversion/weight/Stone'
import { Gram } from '@/plugins/conversion/weight/Gram'
import { Kilogram } from '@/plugins/conversion/weight/Kilogram'
import { Centimeter } from '@/plugins/conversion/distance/Centimeter'
import { Meter } from '@/plugins/conversion/distance/Meter'
import { Kilometer } from '@/plugins/conversion/distance/Kilometer'
import { Parsec } from '@/plugins/conversion/distance/Parsec'
import { Foot } from '@/plugins/conversion/distance/Foot'
import { Inch } from '@/plugins/conversion/distance/Inch'
import { Yard } from '@/plugins/conversion/distance/Yard'
import { Mile } from '@/plugins/conversion/distance/Mile'
import { Liter } from '@/plugins/conversion/volume/Liter'
import { CubicMeter } from '@/plugins/conversion/volume/CubicMeter'
import { GallonUk } from '@/plugins/conversion/volume/GallonUk'
import { GallonUs } from '@/plugins/conversion/volume/GallonUs'
import { PintUk } from '@/plugins/conversion/volume/PintUk'
import { PintUs } from '@/plugins/conversion/volume/PintUs'
import { Celsius } from '@/plugins/conversion/temperature/Celsius'
import { Fahrenheit } from '@/plugins/conversion/temperature/Fahrenheit'
import { Kelvin } from '@/plugins/conversion/temperature/Kelvin'
import { Second } from '@/plugins/conversion/time/Second'
import { Minute } from '@/plugins/conversion/time/Minute'
import { Hour } from '@/plugins/conversion/time/Hour'
import { Day } from '@/plugins/conversion/time/Day'

import TimezoneMap from '@/components/TimezoneMap.vue'

import colors from 'vuetify/util/colors'

import { ref, computed } from 'vue'

import { useLocale } from 'vuetify'
import { mdiArrowDecision } from '@mdi/js'
import { PotentialPart } from '@/plugins/PotentialPart'

const { t, n } = useLocale()

// Keep a mapping of unit abbreviations/synonyms to possible Unit object matches
const mapping = new Map<string, Unit[]>()
// Keep track of all Units used
const units: Unit[] = []
/**
 * Adds the given unit to the unit mapping for retrieval and unit list
 * @param unit The Unit object to add to the mapping and unit list
 */
function addUnit (unit: Unit): void {
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

addUnit(new Ounce())
addUnit(new Pound())
addUnit(new Stone())
addUnit(new Gram())
addUnit(new Kilogram())
addUnit(new Centimeter())
addUnit(new Meter())
addUnit(new Kilometer())
addUnit(new Parsec())
addUnit(new Inch())
addUnit(new Foot())
addUnit(new Yard())
addUnit(new Mile())
addUnit(new Liter())
addUnit(new CubicMeter())
addUnit(new GallonUk())
addUnit(new GallonUs())
addUnit(new PintUk())
addUnit(new PintUs())
addUnit(new Celsius())
addUnit(new Fahrenheit())
addUnit(new Kelvin())
addUnit(new Second())
addUnit(new Minute())
addUnit(new Hour())
addUnit(new Day())

/** The user input */
const input = ref<string>()

/**
 * Sets the input to the given Unit. This is used for ambiguous abbreviations. Current numeric value is maintained.
 * @param unit The Unit object to set as the input unit. Will keep current input value.
 */
function setInput (unit: Unit): void {
  if (input.value) {
    const split = input.value.split(' ')

    input.value = `${split[0]} ${unit.primaryAbbreviation}`
  }
}

/**
 * Checks whether the given number or string is actually a numeric value
 * @param value The value to check. Can be number or string
 * @returns boolean indicating whether this is a number or not
 */
function isNumeric (value?: string | number): boolean {
  return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())))
}

function getPotentialParts (parts: string[]): PotentialPart[] {
  const result: PotentialPart[] = []

  let value: number | null = null
  let unit: string[] = []
  for (let i = 0; i < parts.length; i++) {
    if (isNumeric(parts[i])) {
      if (value !== null) {
        result.push(new PotentialPart(value, unit.join(' ')))
      }
      value = +parts[i]
      unit = []
    } else if (value !== null) {
      unit.push(parts[i])
    }
  }

  if (value !== null) {
    result.push(new PotentialPart(value, unit.join(' ')))
  }

  return result
}

/**
 * Checks whether the given input is of the correct format. Needs to have a least one space and split on spaces, the first
 * part has to be a number.
 * @param value The input string to check
 * @returns Either boolean or string. If boolean, then the input is valid, if string it's the string key for i18n.
 */
function isValid (value?: string): boolean | string {
  if (value === undefined || value === null || value.length < 1) {
    return ''
  } else {
    const parts: string[] = value.split(' ')

    if (parts[0].includes(':')) {
      return true
    }
    
    const possibleParts: PotentialPart[] = getPotentialParts(parts)

    if (possibleParts.length < 1) {
      return t('formFeedbackNoValidUnitsFound')
    } else {
      const usedUnits: Unit[] = possibleParts.map(pp => pp.findUnit(units)).filter((u): u is Unit => !!u)

      const types: Set<string> = new Set(usedUnits.map(u => u.type))

      if (types.size > 1) {
        return t('formFeedbackIncompatibleUnitTypes')
      }

      if (possibleParts.some(pp => !pp.isValid(units))) {
        return t('formFeedbackInvalidUnitDefinition')
      }
    }
  }

  return true
}

const conversionStatus = computed(() => {
  if (isValid(input.value) !== true) {
    return null
  }

  if (input.value !== undefined && input.value !== null && input.value.length > 0) {
    const parts: string[] = input.value.split(' ')

    if (parts.length > 0 && (parts[0].includes(':') || (parts.length > 1 && (parts[1] === 'am' || parts[1] === 'pm')))) {
      let [hour, minute] = parts[0].split(':').map(Number)

      if (parts[1] === 'pm') {
        hour += 12
      }

      return {
        dateConfig: {
          hour: hour,
          minute: minute || 0,
          tz: 'Europe/London'
        },
        converted: false,
        duplicateMatches: [],
        conversions: []
      }
    } else {
      const potentialParts = getPotentialParts(parts)

      let totalSi = 0
      let type: string = ''
      for (let i = 0; i < potentialParts.length; i++) {
        const match: Unit[] | undefined = mapping.get(potentialParts[i].unit.toLowerCase())

        if (match && match.length > 0) {
          if (i === 0 && match.length > 1) {
            return {
              converted: false,
              dateConfig: null,
              duplicateMatches: match,
              conversions: []
            }
          } else {
            totalSi += match[0].toSiUnit(potentialParts[i].value)
            type = match[0].type
          }
        } else {
          return null
        }
      }

      const result: any[] = []

      const others = units.filter((u: Unit) => u.type === type)

      others.forEach(o => {
        result.push({
          name: o.name,
          value: o.fromSiUnit(totalSi)
        })
      })

      return {
        converted: true,
        dateConfig: null,
        duplicateMatches: [],
        conversions: result
      }
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
.conversion-gap {
  gap: 8px;
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
