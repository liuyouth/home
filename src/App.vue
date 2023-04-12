<template>
  <div id="app">
    <div class="controller" >
      <code v-for="key in keys" :key="key" class="font-mono">
              {{ key.replace("key", "") }}
            </code>
    </div>
    <div> {{ msg }}</div>
    <myWidget :class="{ hidden: help }"> </myWidget>
   
    <TodoWidget/>
 
    <template v-for="w in widgets">
      <MyWidget v-bind:id="w.id"></MyWidget>
    </template>
    
  </div>
</template>
<!-- 模块增删部分 -->
 
<!-- 快捷键部分 -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useKeyModifier, useMagicKeys, whenever, useTimeout } from '@vueuse/core'
import myWidget from './Widget.vue'
import MinWidget from './MinWidget.vue'
import TodoWidget from './ToDoWidget.vue'
import MyWidget from './MyWidget.vue'
 

import { Guid } from 'guid-typescript';
import { useStorage } from '@vueuse/core'
// 平台服务

const msg = ref("");


//组件相关
const widgets = useStorage('whiteboard-widgets', [])
const showMsg = (m: string) => {
  msg.value = m

}
const addWidget = (v: never) => {
  showMsg("创建成功")
  widgets.value = [...widgets.value, v]
  showMsg("")
}





// 热键部分
var help = ref(false);
const { ctrl_a_d, ctrl_h, current } = useMagicKeys()
const keys = computed(() => {
 var newList :any[]= [];
 current.forEach((s)=>{
  if(-1!==s.indexOf("Key")){
    console.log("key "+s)
    newList.push(s.substring(3,s.length))
  }else {
    console.log("nokey "+s)
    newList.push(s)
  }
 })
 return newList;
})
whenever(ctrl_a_d, () => {
  showMsg("正在创建widget ：生成唯一id中...")
  addWidget({ id: Guid.create().toString() });
})
whenever(ctrl_h, () => {
  help.value = !help.value
})
function removeKeyFromMK(MK: string): string {
  if (MK.includes("key")) {
    return MK.replace("key", "");
  } else {
    return MK;
  }
}
</script>

<style scoped>
html,
body,
h1,
h2,
h3,
p {
  font-family: 'Noto Serif', '微软雅黑', serif;
  user-select: none;
}
.controller{
  height: 60px;
 
}
.controller code{
  line-height: 50px;
  margin: 8px;
  border-radius: 10px;
padding:2px 20px;
 height: 50px;
 display: inline-block;
 background: rgba(0, 0, 0, 0.452);
 font-size:2rem;
 transition: all linear .3s;;
}
.hidden {
  opacity: 0;
}

#app {
  text-align: center;
  color: rgba(0, 0, 0, 0.521);
}

img {
  width: 500px;
}

a {
  color: #41b883;
  text-decoration: none;
  cursor: pointer;
}
</style>
