import { logger } from '@smart-mirror/lib-common'
import { defineStore } from 'pinia'
import { ref } from 'vue'

type AppTab = {
  id: string
  label: string
  subtabs?: AppTab[]
}
export const APP_TABS = [
  {
    id: 'weather',
    label: 'Weather',
    subtabs: [
      {
        id: 'attendorn',
        label: 'Attendorn',
      },
      {
        id: 'dieringhausen',
        label: 'Dieringhausen',
      },
      {
        id: 'muenchen',
        label: 'München',
      },
    ],
  },
  {
    id: 'calendar',
    label: 'Calendar',
    subtabs: [],
  },
  {
    id: 'smart-home',
    label: 'Smart Home',
    subtabs: [],
  },
] as const satisfies AppTab[]
const allSubtabs = APP_TABS.flatMap((rootTab) => {
  if (rootTab.subtabs.length === 0) {
    return [[rootTab.id]]
  }

  return rootTab.subtabs.map((subTab) => [rootTab.id, subTab.id])
}) as string[][]

export const useNavigationStore = defineStore('navigation', () => {
  const currentSubtab = ref(allSubtabs[0]!)

  function findSubtabIndex(subtab: string[]) {
    return allSubtabs.findIndex(
      (t) => t.length === subtab.length && subtab.every((value, i) => value === t[i]),
    )
  }

  function previous() {
    const currentIndex = findSubtabIndex(currentSubtab.value)
    const nextIndex = currentIndex <= 0 ? allSubtabs.length - 1 : currentIndex - 1
    currentSubtab.value = allSubtabs[nextIndex]!
  }

  function next() {
    const currentIndex = findSubtabIndex(currentSubtab.value)
    const nextIndex = (currentIndex + 1) % allSubtabs.length
    currentSubtab.value = allSubtabs[nextIndex]!
  }

  const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_ENDPOINT)
  socket.addEventListener('open', () => {
    const interval = setInterval(() => {
      socket.send('ping')
    }, 10_000)

    socket.addEventListener('close', () => {
      clearInterval(interval)
    })

    socket.addEventListener('error', (e) => logger.error('WebSocket error:', e))

    socket.addEventListener('message', (event) => {
      try {
        const message = JSON.parse(event.data)
        if (typeof message !== 'object' || message === null) {
          return
        }

        if (!('direction' in message) || typeof message.direction !== 'string') {
          return
        }

        switch (message.direction) {
          case 'left': {
            previous()
            break
          }
          case 'right': {
            next()
            break
          }
          default:
            logger.warn('Received message for unknown direction:', message.direction)
        }
      } catch (e) {
        logger.error('Error while parsing WebSocket message:', e)
      }
    })
  })

  return { currentSubtab, previous, next }
})
