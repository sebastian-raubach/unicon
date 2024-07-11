<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="min(100%, 900px)">
      <v-img class="mb-4" height="150" src="@/assets/logo.svg" />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">{{ t('pageHomeLogoWelcome') }}</div>
        <h1 class="text-h2 font-weight-bold title">UNI</h1>
        <h1 class="text-h2 font-weight-bold title text-rotated">CON</h1>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="12">
          <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">
            <template #title>
              <h2 class="text-h5 mb-3 font-weight-bold"><v-icon>{{ mdiArrowDecision }}</v-icon> {{ t('pageHomeCardTitle') }}</h2>
            </template>

            <template #subtitle>
              <div class="text-subtitle-1">
                <v-form @submit.prevent validate-on="input">
                  <v-text-field :label="t('formLabelHomeInput')"
                                :placeholder="$t('formPlaceholderHomeInput')"
                                :append-inner-icon="isValid(input) === true ? mdiShare : undefined"
                                @click:append-inner="shareInput"
                                v-model="input"
                                required
                                :rules="[isValid]">
                    <template #prepend>
                      <UnitMenu name="Menu" :items="unitMenuItems" />
                    </template>
                  </v-text-field>

                  <template v-if="conversionStatus">
                    <!-- VueUse to get the geolocation -->
                    <UseGeolocation v-slot="{ error, coords: { latitude, longitude } }" v-if="conversionStatus.dataType === 'unitTypeArea' && conversionStatus.totalSi">
                      <!-- Show an area map if the input is an area unit type -->
                      <AreaMap :latitude="latitude" :longitude="longitude" :error="error" :squareMeters="conversionStatus.totalSi" class="mb-4" />
                    </UseGeolocation>
                    <!-- Show a time zone map if the input is a time -->
                    <TimezoneMap :dateConfig="conversionStatus.dateConfig" class="mt-3" v-if="conversionStatus.dateConfig" />
                    <!-- Else, if something has been converted, show the result -->
                    <div class="d-flex flex-wrap conversion-gap" v-else-if="conversionStatus.converted && conversionStatus.conversions && conversionStatus.conversions.length > 0">
                      <!-- For each major unit, show a chip -->
                      <v-chip color="primary" label v-for="c in conversionStatus.conversions" :key="`converted-${c.name}`" class="wrap-chip">
                        <div class="d-flex flex-wrap conversion-gap">
                          <!-- Within each major unit show all sub-divisions -->
                          <div v-for="sub in c.value" :key="`converted-sub-${c.name}-${sub.unitName}`">
                            <h4>{{ t(sub.unitName) }}</h4>
                            <p>{{ n(sub.conversionValue) }}</p>
                          </div>
                        </div>
                      </v-chip>
                    </div>
                    <!-- If there's ambiguity about what unit the user wants converted, show all options -->
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

    <v-dialog v-model="showShare">
      <v-card :title="t('modalTitleShare')">
        <template v-slot:prepend>
          <v-icon>{{ mdiShare }}</v-icon>
        </template>
        <v-card-text>
          <div>{{ t('modalTextShare') }}</div>
          <!-- Share URL input -->
          <v-text-field v-model="shareValue" readonly @focus="$event.target.select()" />
        </v-card-text>

        <template v-slot:actions>
          <!-- Close button -->
          <v-btn class="ms-auto" :text="t('buttonClose')" @click="showShare = false" />
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { Unit } from '@/plugins/conversion/Unit'
import { UseGeolocation } from '@vueuse/components'

// Import ALL the units
import {
  Ounce,
  Pound,
  Stone,
  Milligram,
  Gram,
  MetricTon,
  Kilogram,
  Centimeter,
  Meter,
  Kilometer,
  Parsec,
  Foot,
  Inch,
  Yard,
  Mile,
  Liter,
  CubicMeter,
  GallonUk,
  GallonUs,
  PintUk,
  PintUs,
  Celsius,
  Fahrenheit,
  Kelvin,
  Second,
  Minute,
  Hour,
  Day,
  Hectare,
  SquareMeter,
  Acre,
  SquareKilometer,
  SquareMile,
  SquareYard,
  SquareFoot,
  SquareInch,
  SquareCentimeter,
  Millimeter,
  LongTon,
  ShortTon
} from '@/plugins/conversion'

import TimezoneMap from '@/components/TimezoneMap.vue'
import AreaMap from '@/components/AreaMap.vue'
import UnitMenu, { UnitMenuItem } from '@/components/UnitMenu.vue'
import colors from 'vuetify/util/colors'
import { ref, computed } from 'vue'
import { useLocale } from 'vuetify'
import { mdiArrowDecision, mdiShare } from '@mdi/js'
import { PotentialPart } from '@/plugins/PotentialPart'

// Composition stuff
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

// Add all the units
addUnit(new Stone())
addUnit(new Pound())
addUnit(new Ounce())
addUnit(new LongTon())
addUnit(new MetricTon())
addUnit(new ShortTon())
addUnit(new Kilogram())
addUnit(new Gram())
addUnit(new Milligram())
addUnit(new Parsec())
addUnit(new Kilometer())
addUnit(new Meter())
addUnit(new Centimeter())
addUnit(new Millimeter())
addUnit(new Mile())
addUnit(new Yard())
addUnit(new Foot())
addUnit(new Inch())
addUnit(new Liter())
addUnit(new CubicMeter())
addUnit(new GallonUk())
addUnit(new GallonUs())
addUnit(new PintUk())
addUnit(new PintUs())
addUnit(new Celsius())
addUnit(new Fahrenheit())
addUnit(new Kelvin())
addUnit(new Day())
addUnit(new Hour())
addUnit(new Minute())
addUnit(new Second())
addUnit(new Hectare())
addUnit(new Acre())
addUnit(new SquareKilometer())
addUnit(new SquareMeter())
addUnit(new SquareCentimeter())
addUnit(new SquareMile())
addUnit(new SquareYard())
addUnit(new SquareFoot())
addUnit(new SquareInch())

// Refs
const input = ref<string>()
const shareValue = ref<string>()
const showShare = ref<boolean>(false)

// Read URL input if available
let urlParams = new URLSearchParams(window.location.search)
if (urlParams.has('query')) {
  input.value = urlParams.get('query') as string
}
// Remove any parameters
window.history.replaceState(null, '', window.location.pathname);

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

/** Use Share API to share the input */
async function shareInput (): Promise<void> {
  if (input.value) {
    const url = new URL(window.location.href)
    url.searchParams.append('query', input.value)

    try {
      await navigator.share({
        title: 'UNICON',
        text: 'Convert anything to anything with UNICON',
        url: url.href,
      })
      return
    } catch (err) {
      shareValue.value = url.href
      showShare.value = true
    }
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

const unitMenuItems = computed<UnitMenuItem[]>(() => {
  const result: UnitMenuItem[] = []

  const types: Map<string, Unit[]> = new Map<string, Unit[]>()

  units.forEach(u => {
    const type = u.type
    if (types.has(type)) {
      types.get(type)?.push(u)
    } else {
      types.set(type, [u])
    }
  })

  types.forEach((units: Unit[], type: string) => {
    result.push({
      name: type,
      items: units.map(u => {
        return {
          name: u.name,
          action: () => {
            input.value = `1 ${u.primaryAbbreviation}`
          }
        }
      })
    })
  })

  return result
})

const conversionStatus = computed(() => {
  if (isValid(input.value) !== true) {
    return null
  }

  if (input.value !== undefined && input.value !== null && input.value.length > 0) {
    const parts: string[] = input.value.split(' ')

    let dataType: string = ''

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
        conversions: [],
        dataType: 'timezone',
        totalSi: null
      }
    } else {
      const potentialParts = getPotentialParts(parts)

      let totalSi = 0
      for (let i = 0; i < potentialParts.length; i++) {
        const match: Unit[] | undefined = mapping.get(potentialParts[i].unit.toLowerCase())

        if (match && match.length > 0) {
          if (i === 0 && match.length > 1) {
            return {
              converted: false,
              dateConfig: null,
              duplicateMatches: match,
              conversions: [],
              dataType: null,
              totalSi: null
            }
          } else {
            totalSi += match[0].toSiUnit(potentialParts[i].value)
            dataType = match[0].type
          }
        } else {
          return null
        }
      }

      const result: any[] = []

      const others = units.filter((u: Unit) => u.type === dataType)

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
        conversions: result,
        dataType: dataType,
        totalSi: totalSi
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
