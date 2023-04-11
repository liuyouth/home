<template>
  <div id="app">
    <div class="controller">


    </div>
    <myWidget :class="{ hidden: help }"> </myWidget>
    <div > {{ msg }}</div>
    <!--<myWidget> </myWidget> -->
    <MyWidget v-bind:message="list[0].id"></MyWidget>
    <MyWidget v-bind:message="list[1].id" json="{id:'222',title:'天天打卡'}"></MyWidget>

    <template v-for="w in widgets" >
      <MyWidget v-bind:message="w.id"></MyWidget>
    </template>

  </div>
</template>
<!-- 模块增删部分 -->
 
<!-- 快捷键部分 -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useKeyModifier, useMagicKeys, whenever ,useTimeout} from '@vueuse/core'
import myWidget from './Widget.vue'
import MyWidget from './MyWidget.vue'
import { Guid } from 'guid-typescript';
import {  useStorage } from '@vueuse/core'

var help = ref(false);
const msg = ref("");

const { alt_a_d, alt_h,current } = useMagicKeys()
const keys = current
whenever(
  () => current.size!=0,
  () => console.log('A is pressed but not B'),
)
const list = [{ id: "eee" }, { id: "eee22" }]
whenever(alt_a_d, () => {
  showMsg("正在创建widget ：生成唯一id中...")
  addWidget({id:Guid.create().toString()});
})
whenever(alt_h, () => {
  help.value = !help.value
})


const widgets = useStorage('whiteboard-widgets', [])
const showMsg = (m:string)=>{
  msg.value = m
  
}
const addWidget = (v: never) => {
      showMsg("创建成功")
      widgets.value = [...widgets.value,v]
      showMsg("")
    }

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

.hidden {
  opacity: 0;
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
}</style>
