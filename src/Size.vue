<template>
    <div :style="{ backgroundColor: '#ff7722', height: h + 'px', width: w + 'px' }" style="position: relative;">
        <!-- 点击的 div -->
        <div @click="handleClick" ref="el" :style="{ backgroundColor: '#000fff', height: '30px', width: '30px' }" style="position: absolute;bottom: 0;right: 0;
          ">
            📐
            <br> x: {{ x }}
            y: {{ y }}
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMousePressed, whenever, useMouse } from '@vueuse/core'
const h = ref(100)
const w = ref(100)
const { x, y, sourceType } = useMouse()
const el = ref(null)
const oldx = ref(w.value)
const oldy = ref(h.value)
const { pressed } = useMousePressed({ target: el })
watch(pressed,()=>{
    console.log("eeee "+pressed.value)
    if(pressed.value){
        oldx.value = x.value;
        oldy.value = y.value;
    }else {
        // console.log("x "+(x.value - oldx.value))
        // console.log("y "+(y.value - oldy.value))
    }
  })
const changeSize = (xx, yy) => {
    if (pressed.value) {
        h.value = h.value + (y.value - oldy.value)
        w.value = w.value + (x.value - oldx.value)

        console.log("x " + (x.value - oldx.value))
        console.log("y " + (y.value - oldy.value))
        oldx.value = x.value;
        oldy.value = y.value;
    } else {

    }
}
watch(x, () => {
    changeSize(x, y)
})
watch(y, () => {
    changeSize(x, y)
})



</script>  
  