<template>
  <div id="app">
    <div ref="el" :style="style" class="widget">
      Drag me! I am at {{ x }}, {{ y }}
    </div>
    <!-- <div id="el2" :style="ud.style.value" class="widget" >
    Drag me! I am at {{ud.x}}, {{ud.y}}
  </div> -->
    <Draggable class="widget" :initialValue="{ x: 10, y: 10 }" v-slot="{ x, y }">
      Drag me! I am at {{ x }}, {{ y }}
    </Draggable>
    <Draggable class="widget" :initialValue="{ x: 10, y: 10 }" v-slot="{ x, y }">
      Drag me! I am at {{ x }}, {{ y }}
    </Draggable>
    <Draggable  class="widget" v-slot="{ x, y }" p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      :initial-value="{ x: 1000 / 3.9, y: 150 }"
      :prevent-default="true"
      storage-key="vueuse-draggable-pos"
      storage-type="local">
      <div ref="handle" class="cursor-move">
        👋 Drag here!
      </div>
      Drag me! I am at {{ x }}, {{ y }}
    </Draggable>
    <Draggable
      v-slot="{ x, y }"
      p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      class="widget"
      storage-key="vueuse-draggable-pos2"
      storage-type="local"
      :initial-value="{ x: 1000 / 3.6, y: 240 }"
      :prevent-default="true"
      :handle="handles[0]"
    >
      <div  :ref="handles[0]" class="cursor-move">
        👋 Drag here!
      </div>
      <div class="text-xs opacity-50">
        Handle that triggers the drag event
      </div>
      <div class="text-sm opacity-50">
        I am at {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </Draggable>
    <Draggable
      v-slot="{ x, y }"
      p="x-4 y-2"
      border="~ gray-400/30 rounded"
      shadow="~ hover:lg"
      class="widget"
      storage-key="vueuse-draggable-pos3"
      storage-type="local"
      :initial-value="{ x: 1000 / 3.6, y: 240 }"
      :prevent-default="true"
      :handle="handle"
    >
      <div ref="handle" class="cursor-move">
        👋 Drag here!
      </div>
      <div class="text-xs opacity-50">
        Handle that triggers the drag event
      </div>
      <div class="text-sm opacity-50">
        I am at {{ Math.round(x) }}, {{ Math.round(y) }}
      </div>
    </Draggable>
    

  </div>
</template>
<script lang="ts">
export default {

  onMounted() {
    console.log(this.$refs["el2"])
  }
}
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMouse, useCounter } from '@vueuse/core'
import { useDraggable } from '@vueuse/core'
import { UseDraggable as Draggable } from '@vueuse/components'
const { count, inc, dec } = useCounter()
const el = ref<HTMLElement | null>(null)
  const handle = ref<HTMLElement | null>(null)
    const handles = [
    ref<HTMLElement | null>(document.getElementById("")),ref<HTMLElement | null>(null),ref<HTMLElement | null>(null)
    ]
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 240, y: 240 },
})
const e22 = { x: 100, y: 200 };






</script>

<style scoped>
html,
body,
h1,
h2,
h3,
p {
  font-family: 'Noto Serif', serif;
  user-select: none;
}

#app {
  text-align: center;
  color: rgba(0, 0, 0, 0.4);
}

img {
  width: 500px;
}

a {
  color: #41b883;
  text-decoration: none;
  cursor: pointer;
}

/* 未拖动时候样式 */
.widget {
  position: fixed;
  background: #68f480;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 8px rgba(104, 244, 128, 0.5);
}


/* 拖动时候样式 */
.widget:active {
  background-color: #f4ca68;
  box-shadow: 0 0 16px rgba(104, 244, 128, 0.8);
}

/* 鼠标悬停时的样式 */
.widget:hover {
  background-color: #98f3c3;
  box-shadow: 0 0 12px rgba(104, 244, 128, 0.6);
}
</style>
