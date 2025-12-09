import { api } from '@/lib/api'
import { type LocationModel, WeatherDataModel } from '@smart-mirror/lib-api'
import { logger, sleep } from '@smart-mirror/lib-common'
import { useIntervalFn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useWeatherStore = defineStore('weather', () => {
  const locations = ref<LocationModel[]>([
    {
      id: 'attendorn',
      label: 'Attendorn',
      coordinates: {
        latitude: 51.1250541,
        longitude: 7.9010992,
      },
    },
    {
      id: 'dieringhausen',
      label: 'Dieringhausen',
      coordinates: {
        latitude: 50.9885393,
        longitude: 7.5026416,
      },
    },
    {
      id: 'muenchen',
      label: 'München',
      coordinates: {
        latitude: 48.09260177612305,
        longitude: 11.5301513671875,
      },
    },
  ])

  const weather = reactive<Record<string, WeatherDataModel>>({})

  function addLocation(location: LocationModel) {
    if (locations.value.some((loc) => loc.id === location.id)) {
      throw new Error(
        `Error adding new location (id="${location.id}", label="${location.label}") - id already exists`,
      )
    }

    locations.value.push(location)
    fetch()
  }

  const isFetching = ref(false)
  async function fetch() {
    if (isFetching.value) {
      return
    }

    logger.debug('Start fetching weather data...')
    try {
      isFetching.value = true
      for (const location of locations.value) {
        const response = await api.getWeather.query(location.coordinates)
        weather[location.id] = WeatherDataModel.parse(response)
        await sleep(100)
      }
    } finally {
      isFetching.value = false
    }
  }

  fetch()
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      fetch()
    },
    30_000,
    {
      immediate: true,
    },
  )

  return {
    weather,
    addLocation,
    fetch,
    pause,
    resume,
    isActive,
    locations: computed(() => locations.value),
  }
})
