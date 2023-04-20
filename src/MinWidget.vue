<template>
  <div :style="{ height: us.h + 'px', width: us.w + 'px' ,top:us.top+'px',left:us.left+'px'}"   
    class="min-widget demo"
     :storage-key="'xy' + id" storage-type="local" 
     >
    
    <div v-if="isImg" class="drag" style="width: 160px;">
     
      <input type="text" style="width: 90%;border: 0px;   "  v-model="usImg" >
    </div>
    <div  class="drag" style="top：-35px;right:-240px;width: 220px;">
      <!-- todo 这里的具体位置要随着大小 拖动来动态决定，因为在最右侧或者最左侧时候 显示不出来 -->
      <textarea name="" id="" cols="30" rows="10" style="width: 100%;">
        class 
      </textarea>
    </div>
  
  <input class="showText" type="text" v-if="!isImg" ref="minel" v-model="usTxt">
  <img v-if="isImg" :src="usImg" alt="" style="height:100%;width: 100%;" ref="minel" draggable="false">
  <!-- {{ ppx }} + {{ ppy }}
     <br>
     {{ mud.x }} + {{ mud.y }}
     <br>
     {{ mud.x.value-ppx }} + {{ mud.y.value-ppy }} -->


  

    <div ref="el" class="resize">
      <img src="./imgs/resize.png" style="width: 88%;opacity: .5;" alt="">
    </div>
  </div>
</template>
  // 需要考虑子父组件分别被拖动的情况，子组件拖动 全局xy - 父组件xy 得到相对父组件位置
  // 父组件拖动 子组件的相对位置 + 被改变的位置  
<script setup lang="ts" name="MyWidget">
import { ref, onMounted, watch } from 'vue'
import { Guid } from 'guid-typescript';
import { useStyleTag, useMousePressed, whenever, useMouse, useStorage ,useDraggable} from '@vueuse/core'
 const emit =defineEmits(['clickId'])
const props = defineProps({
  id: String
  ,ppx:Number
  ,ppy:Number
  ,isImg:Boolean
})

// us控制大小
const us = useStorage('minwdiget' + props.id, { w: 150, h: 100 ,top:10,left:10});
const minel = ref<HTMLElement | null>(null)
 
const mud = useDraggable(minel, {
  initialValue: { x: us.value.left, y: us.value.top },
})
const usTxt = useStorage("txt"+props.id,"点击 我改变文本");
const usImg = useStorage("img"+props.id,"输入链接");
const oldpx = ref(props.ppx)
const oldpy = ref(props.ppy)
const parentChange = (parentx,parenty)=>{
  us.value.left = (mud.x.value-props.ppx)+parentx-oldpx.value
  us.value.top = (mud.y.value-props.ppy)+parenty-oldpy.value
}
const minChange=(minx,miny)=>{
  
  emit('clickId',props.id)
  us.value.left = (minx-props.ppx)
  us.value.top = (miny-props.ppy)
}
watch(mud.x,()=>minChange(mud.x.value,mud.y.value))
watch(mud.y,()=>minChange(mud.x.value,mud.y.value))
watch(props.ppx,()=>parentChange(props.ppx,props.ppy))
watch(props.ppy,()=>parentChange(props.ppx,props.ppy))



const minum = useMouse()
const el = ref(null)
const oldx = ref(us.value.w)
const oldy = ref(us.value.h)
const { pressed } = useMousePressed({ target: el })
 
watch(pressed, () => {

  emit('clickId',props.id)
  if (pressed.value) {
    props.clickId= props.id
    oldx.value = (minum.x.value-props.ppx);
    oldy.value = (minum.y.value-props.ppy);
    
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
.showText{
  border:0;
  font-size: 1.2rem;
  outline: medium;
  color: #ffffff;
  background-color: transparent;
}
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
  background: #bcd0faa1;
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
  