<template>
  <div id="app">
    <img src="./logo.svg" />
    <h1>Hello <a href='https://github.com/vuejs/vite' target='__blank'>Vite</a> and <a href='https://github.com/vueuse/vueuse' target='__blank'>VueUse</a>!</h1>

    <h3>Mouse: {{x}} x {{y}}</h3>
    <h3>
      Counter: {{count}}
      <a @click='inc()' style='margin-right:10px'>+</a>
      <a @click='dec()'>-</a>
    </h3>

    <br><br>
    <p><a href='https://github.com/vueuse/vueuse-vite-starter' target='__blank'>Source</a></p>
    <p><a href='https://vueuse-vue3-example.netlify.app/' target='__blank'>Webpack Example</a></p>
  </div>
  <div ref="el" :style="style" class="widget" >
    Drag me! I am at {{x}}, {{y}}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMouse, useCounter } from '@vueuse/core'
import { useDraggable } from '@vueuse/core'
// const { x, y } = useMouse()
const { count, inc, dec } = useCounter()

const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 240, y: 240 },
})
</script>

<style scoped>
html, body, h1, h2, h3, p {
  font-family: 'Noto Serif', serif;
  user-select: none;
}

#app {
  text-align: center;
  color: rgba(0,0,0,0.4);
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
.widget{
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
  background-color: #7d68f4;
  box-shadow: 0 0 12px rgba(104, 244, 128, 0.6);
}

</style>
