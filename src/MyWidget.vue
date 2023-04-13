<template>
  <Draggable :style="{ height: us.h + 'px', width: us.w + 'px' }" v-slot="{ x, y }" p="x-4 y-2"
    border="~ gray-400/30 rounded" shadow="~ hover:lg" class="widget demo" :storage-key="'xy' + id" storage-type="local"
    :initial-value="{ x: 1000 / 3.6, y: 240 }" :prevent-default="true" :handle="handle">


    <div class="controlbar row">
      
      <div class="button">🌄</div>
      <div class="button">📝</div>
      <div ref="handle" class="button">👋</div>
    </div>
    <div style="height:100%;position: relative;">
      <!-- <div class="text-xs opacity-50">

        {{ usTxt }}
      </div> -->
      <textarea v-model="usTxt" name="" id="" disabled="false">
        </textarea>
      <MinWidget :id="'min' + id" v-bind:ppx="x" v-bind:ppy="y" />
    </div>





    <div ref="el" class="resize">
      <img src="./imgs/resize.png" style="width: 88%;opacity: .5;" alt="">

    </div>
  </Draggable>
</template>
  
<script setup lang="ts" name="MyWidget">
import { ref, onMounted, watch } from 'vue'
import { useStyleTag, useMousePressed, whenever, useMouse, useStorage } from '@vueuse/core'
import { UseDraggable as Draggable } from '@vueuse/components'
import MinWidget from './MinWidget.vue';
import { Guid } from 'guid-typescript';

//组件相关
const widgets = useStorage('min-widgets'+props.id, [])

const props = defineProps({
  id: String
})

const us = useStorage('wh' + props.id, { w: 150, h: 100 });
const handle = ref<HTMLElement | null>(null)
const usTxt = useStorage("txt" + props.id, "点击 我改变文本");



const um = useMouse()
const el = ref(null)
const oldx = ref(us.value.w)
const oldy = ref(us.value.h)
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
    us.value.h = us.value.h + (um.y.value - oldy.value)
    us.value.w = us.value.w + (um.x.value - oldx.value)

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
textarea {
  background: transparent;
  border: 0;
  resize: none;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: rgba(80, 80, 80, 0.826);
}

.widget:hover .controlbar {
  opacity: 1;
}

.widget:active .controlbar {
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

.controlbar {
  opacity: 0;
  position: absolute;
  right: 10px;
  top: -35px;
  transition: all linear .3s;
}

.button {

  margin: 2px;
  padding: 2px 2px;
  border-radius: 10px;
  width: 50px;
  background: #888888a1;

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
  