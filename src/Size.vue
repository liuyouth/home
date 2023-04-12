<template>  
    <div :style="{ backgroundColor: selectedColor, height: '100px', width: '100px' }">  
      <!-- 点击的 div -->  
      <div @click="handleClick" :style="{ backgroundColor: selectedColor, height: '50px', width: '50px' }">  
        Click me  
      </div>  
    </div>  
  </template>
  
  <script setup lang="ts">  
  import { ref } from 'vue'  
  import VueUse from '@vueuse/core'
  
 
  
    //   // 使用 vueuse 的 useMouse 和 useMousePressed 钩子来捕获鼠标事件  
    //   const mouse = VueUse.useMouse()  
    //   const mousePressed = VueUse.useMousePressed()
  
    //   // 记录点击位置  
    //   const clickPos = mousePressed()
  
    //   // 拖动时鼠标的位置  
    //   const dragPos = mousePressed.getDragPos()
  
    //   // 获取 div 的实例  
    //   const div = mount.getDOMNode().getElementById('div')
  
 
  </script>  
  