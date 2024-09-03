<template>
  <div id="map" ref="mapElement" class="rounded-lg" />
</template>

<script lang="ts" setup>
import { coreStore } from '@/store'
const store = coreStore()

import { ref, onMounted, watch, watchEffect } from 'vue'
import L, { TileLayer, Rectangle, Circle, LatLng, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTheme } from 'vuetify'

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

const props = defineProps<{
  latitude: number | undefined,
  longitude: number | undefined,
  error: string | undefined,
  squareMeters: number
}>()

// Refs
const mapElement = ref('')
const systemTheme = ref('dark')

// Composition stuff
const theme = useTheme()

const primary = theme.current.value.colors.primary

let themeLayer: TileLayer
let rectangle: Rectangle
let circle: Circle
let map: Map
let media: MediaQueryList

function initMap () {
  map = L.map(mapElement.value)
  map.setView([22.5937, 2.1094], 3)

  const theme = store.theme === 'system' ? systemTheme.value : store.theme
  themeLayer = L.tileLayer(`//services.arcgisonline.com/arcgis/rest/services/Canvas/${theme === 'dark' ? 'World_Dark_Gray_Base' : 'World_Light_Gray_Base'}/MapServer/tile/{z}/{y}/{x}`, {
    id: theme === 'dark' ? 'Esri Dark Gray Base' : 'Esri Light Gray Base',
    attribution: 'Esri, HERE, Garmin, FAO, NOAA, USGS, © OpenStreetMap contributors, and the GIS User Community',
    maxZoom: 21,
    maxNativeZoom: 15
  })

  map.addLayer(themeLayer)
  
  const perimeter = 100_000 // we want a rectangle with a 100km perimeter
  const rectangleCenter = [13, -13] // center of the rectangle
  circle = new Circle(new LatLng(rectangleCenter[0], rectangleCenter[1]), { radius: perimeter / 8, opacity: 0, fillOpacity: 0 }).addTo(map)
  const bounds = circle.getBounds()
  rectangle = new Rectangle(bounds, { color: primary, weight: 1 })
  rectangle.addTo(map)
  map.fitBounds(bounds, { padding: [50, 50] })

  // Disable zoom until focus gained, disable when blur
  map.scrollWheelZoom.disable()
  map.on('focus', () => map.scrollWheelZoom.enable())
  map.on('blur', () => map.scrollWheelZoom.disable())
  map.on('dragend', () => {
    updateRectangle(true)
  })
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

function updateRectangle (useCenter = false) {
  // Calculate the dimensions of the square by using an invisible circle
  const radius = Math.sqrt(props.squareMeters) / 2
  if (useCenter) {
    circle.setLatLng(map.getCenter())
  } else if (props.latitude !== undefined && props.latitude !== null && props.longitude !== undefined && props.longitude !== null && props.latitude !== Infinity && props.longitude !== Infinity) {
    // Update center
    circle.setLatLng(new LatLng(props.latitude, props.longitude))
  }
  // Set radius
  circle.setRadius(radius)
  const bounds = circle.getBounds()
  // Update rect to same bounds
  rectangle.setBounds(bounds)
  // Update map view
  if (!useCenter) {
    map.fitBounds(bounds, { padding: [50, 50] })
  }
}
// If any prop changes, update the rectangle
watch(() => props, () => {
  updateRectangle()
}, { deep: true })

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
