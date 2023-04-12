<template>
  <div :style="{ height: us.h + 'px', width: us.w + 'px' ,top:(mud.y.value+ppy)+'px',left:(mud.x.value+ppx)+'px'}"   
    class="min-widget demo"
     :storage-key="'xy' + id" storage-type="local" 
     >
     {{ mud.x }} + {{ mud.y }}
     <br>
     {{ mud.x.value+ppx }} + {{ mud.y.value+ppy }}
    <!-- <div  class="drag">
      👋
    </div> -->
  <img src="./logo.svg" alt="" ref="minel">



  

    <div ref="el" class="resize">
      <img src="./imgs/resize.png" style="width: 88%;opacity: .5;" alt="">

    </div>
  </div>
</template>
  
<script setup lang="ts" name="MyWidget">
import { ref, onMounted, watch } from 'vue'
import { useStyleTag, useMousePressed, whenever, useMouse, useStorage ,useDraggable} from '@vueuse/core'
 
const props = defineProps({
  id: String
  ,ppx:Number
  ,ppy:Number
})

const us = useStorage('wh' + props.id, { w: 150, h: 100 });
const minel = ref<HTMLElement | null>(null)
const mud = useDraggable(minel, {
  initialValue: { x: 10, y: 10 },
})
const usTxt = useStorage("txt"+props.id,"点击 我改变文本");




const minum = useMouse()
const el = ref(null)
const oldx = ref(us.value.w)
const oldy = ref(us.value.h)
const { pressed } = useMousePressed({ target: el })
 
watch(pressed, () => {

  if (pressed.value) {
    console.log("xxxx " + (minum.x.value - props.ppx))
    oldx.value = (minum.x.value-props.ppx);
    oldy.value = (minum.y.value-props.ppy);
    console.log("dddw"+oldx.value)
  } else {
    // console.log("x "+(x.value - oldx.value))
    // console.log("y "+(y.value - oldy.value))
  }
})
const changeSize = (xx, yy) => {
  xx = xx -props.ppx
  yy = yy -props.ppy
  if (pressed.value) {
    us.value.h = us.value.h + (yy - oldy.value)
    us.value.w = us.value.w + (xx - oldx.value)

    console.log("x " + (xx - oldx.value))
    console.log("y " + (yy - oldy.value))
    oldx.value = xx;
    oldy.value = yy;
  } else {

  }
}
watch(minum.x, () => {
  changeSize(minum.x.value, minum.y.value)
})
watch(minum.y, () => {
  changeSize(minum.x.value, minum.y.value)
})

</script>
  
<style scoped>
textarea{
  background: transparent;
  border: 0;
  resize: none;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: rgba(80, 80, 80, 0.826);
}
.min-widget:hover .drag {
  opacity: 1;
}

.min-widget:active .drag {
  opacity: 1;
}

.min-widget:hover .resize {
  opacity: 1;
}

.min-widget:active .resize {
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
.min-widget {
  position: absolute;
  border-radius: 10px;
  transition: background linear .2s;
  transition: box-shadow linear .2s;
}


/* 拖动时候样式 */
.min-widget:active {
  background-color: #b8fbc3;
  box-shadow: 0 0 16px rgba(104, 244, 128, 0.8);
}

/* 鼠标悬停时的样式 */
.min-widget:hover {

}
</style>
  