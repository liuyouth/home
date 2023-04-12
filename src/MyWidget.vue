<template>
  <Draggable v-slot="{ x, y }" p="x-4 y-2" border="~ gray-400/30 rounded" shadow="~ hover:lg" class="widget demo"
    :storage-key="id" storage-type="local" :initial-value="{ x: 1000 / 3.6, y: 240 }" :prevent-default="true"
    :handle="handle">

    <div ref="handle" class="drag">
      👋
    </div>
    <div class="text-xs opacity-50">
      Handle that triggers the drag event
    </div>
    <div class="text-sm opacity-50">
      I am at {{ Math.round(x) }}, {{ Math.round(y) }}
    </div>
  </Draggable>
</template>
  
<script setup lang="ts" name="MyWidget">
import { ref, onMounted } from 'vue'
import { useStyleTag } from '@vueuse/core'
import { UseDraggable as Draggable } from '@vueuse/components'
const props = defineProps({
  id: String
})

const handle = ref<HTMLElement | null>(null)

</script>
  
<style scoped>
.widget:hover .drag {
  opacity: 1;
}

.widget:active .drag {
  opacity: 1;
}

.drag {
  opacity: 0;
  padding: 2px 2px;
  border-radius: 10px;
  width: 50px;
  background: #888888a1;
  position: absolute;
  right: 10px;
  top: -35px;
  transition: all linear .3s;
}

/* 未拖动时候样式 */
.widget {
  position: fixed;
  background: #68f480;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 8px rgba(104, 244, 128, 0.5);

  transition: background linear .2s;
  transition: box-shadow linear .2s;
}


/* 拖动时候样式 */
.widget:active {
  background-color: #b8fbc3;
  box-shadow: 0 0 16px rgba(104, 244, 128, 0.8);
}

/* 鼠标悬停时的样式 */
.widget:hover {
  /* background-color: #b8fbc3; */
  box-shadow: 0 0 22px rgba(104, 244, 128, 0.6);
}
</style>
  