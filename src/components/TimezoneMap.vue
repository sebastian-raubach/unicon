<template>
  <div id="map" ref="mapElement" class="rounded-lg" />
</template>

<script lang="ts" setup>
import timezones from '@/assets/timezones.json'
import { DateTime } from 'luxon'
import { coreStore } from '@/store'

import { ref, onMounted, watch, watchEffect } from 'vue'
import L, { Layer, TileLayer } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTheme, useLocale } from 'vuetify'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Set the leaflet marker icon
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl
})

interface DateConfig {
  tz: string,
  hour: number,
  minute: number
}

const props = defineProps<{
  dateConfig: DateConfig
}>()

// Refs
const mapElement = ref('')
const systemTheme = ref('dark')

// Composition stuff
const store = coreStore()
const theme = useTheme()
const { current } = useLocale()
const primary = theme.current.value.colors.primary

let geoJsonLayer: L.GeoJSON
let themeLayer: TileLayer

let media: MediaQueryList
function initMap () {
  const map = L.map(mapElement.value)

  map.setView([22.5937, 2.1094], 3)

  const theme = store.theme === 'system' ? systemTheme.value : store.theme
  themeLayer = L.tileLayer(`//services.arcgisonline.com/arcgis/rest/services/Canvas/${theme === 'dark' ? 'World_Dark_Gray_Base' : 'World_Light_Gray_Base'}/MapServer/tile/{z}/{y}/{x}`, {
    id: theme === 'dark' ? 'Esri Dark Gray Base' : 'Esri Light Gray Base',
    attribution: 'Esri, HERE, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors, and the GIS User Community',
    maxZoom: 21,
    maxNativeZoom: 15
  })

  const layerPrimary = { weight: 1, color: primary, fillColor: primary }
  const layerOther = { weight: 1, color: '#7f8c8d', fillColor: '#7f8c8d', opacity: 0.1 }

  map.addLayer(themeLayer)
  // @ts-ignore
  geoJsonLayer = L.geoJSON(timezones, {
    onEachFeature: function (feature: any, layer: Layer) {
      if (feature.properties.tz_name1st) {
        const popup = L.popup()
        popup.setContent(DateTime.fromObject({ hour: props.dateConfig.hour, minute: props.dateConfig.minute }, { zone: DateTime.now().zoneName /*props.dateConfig.tz*/ }).setLocale(current.value).setZone(feature.properties.tz_name1st).toLocaleString(DateTime.DATETIME_FULL))
        layer.bindPopup(popup, { className: 'popup-with-no-events' })
      }
      layer.on('mouseover', function (e: any) {
        const popup = e.target.getPopup()
        if (popup) {
          popup.setLatLng(e.latlng).openOn(map)
        }
        // @ts-ignore
        this.setStyle(layerPrimary)
      })
      layer.on('mouseout', function (e: any) {
        e.target.closePopup()
        if (feature.properties.tz_name1st === props.dateConfig.tz) {
          // @ts-ignore
          this.setStyle(layerPrimary)
        } else {
          // @ts-ignore
          this.setStyle(layerOther)
        }
      })
      layer.on('mousemove', (e: any) => {
        const popup = e.target.getPopup()
        if (popup) {
          popup.setLatLng(e.latlng).openOn(map)
        }
      })
    },
    style: (feature: any) => {
      if (feature.properties && props.dateConfig && props.dateConfig.tz) {
        if (feature.properties.tz_name1st === props.dateConfig.tz) {
          return layerPrimary
        } else {
          return layerOther
        }
      }
    }
  })
  geoJsonLayer.addTo(map)
  map.fitBounds(geoJsonLayer.getBounds())

  // Disable zoom until focus gained, disable when blur
  map.scrollWheelZoom.disable()
  map.on('focus', () => map.scrollWheelZoom.enable())
  map.on('blur', () => map.scrollWheelZoom.disable())
}

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
watchEffect(() => {
  const theme = store.theme === 'system' ? systemTheme.value : store.theme

  // Update the tile layer
  if (themeLayer && themeLayer) {
    themeLayer.setUrl(`//services.arcgisonline.com/arcgis/rest/services/Canvas/${theme === 'dark' ? 'World_Dark_Gray_Base' : 'World_Light_Gray_Base'}/MapServer/tile/{z}/{y}/{x}`)
  }
})

watch(() => props.dateConfig, () => {
  // @ts-ignore
  Object.values(geoJsonLayer._layers).forEach((l: any) => l.setPopupContent(DateTime.fromObject({ hour: props.dateConfig.hour, minute: props.dateConfig.minute }, { zone: props.dateConfig.tz }).setLocale(current.value).setZone(l.feature.properties.tz_name1st).toLocaleString(DateTime.DATETIME_FULL)))
})

onMounted(() => initMap())
</script>

<style scoped>
#map {
  height: 50vh;
}
</style>

<style>
.popup-with-no-events {
  pointer-events: none;
}
.leaflet-popup-content-wrapper {
  border-radius: 8px;
}
</style>
