<template>
  <Draggable :style="{ height: h + 'px', width: w + 'px' }" v-slot="{ x, y }" p="x-4 y-2" border="~ gray-400/30 rounded"
    shadow="~ hover:lg" class="widget demo" :storage-key="id" storage-type="local"
    :initial-value="{ x: 1000 / 3.6, y: 240 }" :prevent-default="true" :handle="handle">

    <div ref="handle" class="drag">
      👋
    </div>
    <div>
      <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
    </div>
    <div class="text-xs opacity-50">
      Handle that triggers the drag event
    </div>
    <div class="text-sm opacity-50">
      I am at {{ Math.round(x) }}, {{ Math.round(y) }}
    </div>






    <div ref="el" class="resize">
      <img src="./imgs/resize.png" style="width: 88%;opacity: .5;" alt="">

    </div>
  </Draggable>
</template>
  
<script setup lang="ts" name="MyWidget">
import { ref, onMounted, watch } from 'vue'
import { useStyleTag, useMousePressed, whenever, useMouse } from '@vueuse/core'
import { UseDraggable as Draggable } from '@vueuse/components'
const props = defineProps({
  id: String
})
const h = ref(100)
const w = ref(200)

const handle = ref<HTMLElement | null>(null)




const um = useMouse()
const el = ref(null)
const oldx = ref(w.value)
const oldy = ref(h.value)
const { pressed } = useMousePressed({ target: el })
watch(pressed, () => {
  console.log("eeee " + pressed.value)
  if (pressed.value) {
    oldx.value = um.x.value;
    oldy.value = um.y.value;
  } else {
    // console.log("x "+(x.value - oldx.value))
    // console.log("y "+(y.value - oldy.value))
  }
})
const changeSize = (xx, yy) => {
  if (pressed.value) {
    h.value = h.value + (um.y.value - oldy.value)
    w.value = w.value + (um.x.value - oldx.value)

    console.log("x " + (um.x.value - oldx.value))
    console.log("y " + (um.y.value - oldy.value))
    oldx.value = um.x.value;
    oldy.value = um.y.value;
  } else {

  }
}
watch(um.x, () => {
  changeSize(um.x, um.y)
})
watch(um.y, () => {
  changeSize(um.x, um.y)
})

</script>
  
<style scoped>
.widget:hover .drag {
  opacity: 1;
}

.widget:active .drag {
  opacity: 1;
}
.widget:hover .resize {
  opacity: 1;
}

.widget:active .resize {
  opacity: 1;
}

.resize {
  opacity: 0;
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: all linear .3s;
  cursor: nwse-resize;
}

.drag {
  padding: 3px;
  opacity: 0;
  padding: 2px 2px;
  border-radius: 10px;
  width: 50px;
  background: #888888a1;
  position: absolute;
  right: 10px;
  top: -35px;
  transition: all linear .3s;
  cursor: pointer;
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
  