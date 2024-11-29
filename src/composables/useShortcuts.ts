import { computed } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core'
import { Guid } from 'guid-typescript'
import type { Widget } from '../types'

export function useShortcuts(options: {
  onAddWidget: (widget: Widget) => void
  onToggleHelp: () => void
  onToggleMenu: () => void
}) {
  const { ctrl_a_d, ctrl_h, ctrl_m, current } = useMagicKeys()

  const keys = computed(() => {
    return Array.from(current).map(key => {
      return key.includes("Key") ? key.substring(3) : key
    })
  })

  whenever(ctrl_a_d, () => options.onAddWidget({ 
    id: Guid.create().toString(),
    type: 'default'
  }))
  whenever(ctrl_h, options.onToggleHelp)
  whenever(ctrl_m, options.onToggleMenu)

  return { keys }
} 