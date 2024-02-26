<template>
  <div class="app">
    <div class="controller">
      <code v-for="key in keys" :key="key" class="font-mono">
                {{ key.replace("key", "") }}
              </code>
    </div>
    <div> {{ msg }}</div>
    <div id="menuBox" class="menuBox" :class="{ 'menuBoxOpen': isMenuOpen }">
      <div class="row" style="align-items: center; ">


        <div class="row" style=" width: 100%;   gap: 28px; justify-content: center;">
          <template v-for="p in pages">
            <div class="pageBox" @click="onPageSelect(p)" v-bind:id="p.name">
              <div :class="{ 'currPage': p.isCurrent }"
                style="width: 120px;min-height: 90px;background-color:#131518d8;border-radius: 10px;">

              </div>
              <input style="width: 120px;" class="showText" type="text" placeholder="Page 1" ref="minel"
                v-model="p.name" />
            </div>
          </template>
        </div>
        <div class="addPage" style="" @click="onAddPageClick()">
          +
        </div>
      </div>
    </div>


    <!-- <img v-for="r in rr" :key="r.w"  :width="r.w" :height="r.h" :src="r.data" /> -->




    <myWidget :class="{ hidden: help }"> </myWidget>

    <TodoWidget :class="{ hidden: help }" />
    <template v-for="(p,i) in pages">
      <div class="widgetsBox"   :class="{'curr':(i===currIndex), 'menuBoxOpen': isMenuOpen}">
        <template v-for="w in pages[i].widgets">
          <MyWidget v-bind:id="w.id"></MyWidget>
        </template>
      </div>
    </template>

  </div>
</template>
<!-- 模块增删部分 -->
 
<!-- 快捷键部分 -->
<script setup lang="ts">
import { ref, computed, toRaw } from 'vue'
import { useKeyModifier, useMagicKeys, whenever, useTimeout } from '@vueuse/core'
import myWidget from './Widget.vue'
import MinWidget from './MinWidget.vue'
import TodoWidget from './ToDoWidget.vue'
import MyWidget from './MyWidget.vue'
import axios from 'axios';


import { Guid } from 'guid-typescript';
import { useStorage } from '@vueuse/core'
// 平台服务

const msg = ref("");
const isMenuOpen = ref(false);

var rr = ref([]);
axios.get("src/json/rrr.json").then((response) => {

  rr.value = response.data
})

//组件相关
const pages = useStorage('whiteboard-pages', [{ name: "", isCurrent: true, widgets: [] }])
const pageName = ref(pages.value[0].name)
const currIndex = ref(0)
const refreshPage = () => {
  pages.value.forEach((p, i) => {
    if (p.isCurrent) {
      pageName.value = p.name;
      currIndex.value = i;
      // p.widgets.value = useStorage('whiteboard-widgets'+pageName.value, []).value;
    }
  })
}
refreshPage();
const showMsg = (m: string) => {
  msg.value = m
}
const addWidget = (v: never) => {
  showMsg("创建成功")
  pages.value.forEach((p) => {
    if (p.isCurrent) {
      pageName.value = p.name;
      p.widgets = [...p.widgets, v]
    }
  })

  showMsg("")
}






//组件相关
const help = useStorage('help-bool', true)
const { ctrl_a_d, ctrl_h, current, ctrl_m } = useMagicKeys()
const keys = computed(() => {
  var newList: any[] = [];
  current.forEach((s) => {
    if (-1 !== s.indexOf("Key")) {
      // console.log("key "+s)
      newList.push(s.substring(3, s.length))
    } else {
      // console.log("nokey "+s)
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
whenever(ctrl_m, () => {
  isMenuOpen.value = !isMenuOpen.value
  console.log("ctrl_m")
  console.log(isMenuOpen.value)
})
function removeKeyFromMK(MK: string): string {
  if (MK.includes("key")) {
    return MK.replace("key", "");
  } else {
    return MK;
  }
}
const onPageSelect =
  (page: { name: string; isCurrent: boolean }) => {
    pages.value.forEach((p) => {
      p.isCurrent = false;
      if (p.name === page.name) {
        p.isCurrent = true
      }
    });
    isMenuOpen.value = !isMenuOpen.value
    refreshPage();
  }
const onAddPageClick = () => {

  pages.value.push({ name: "page" + (pages.value.length + 1), isCurrent: false, widgets: [] })
}
</script>

<style scoped>
/* background: linear-gradient(102.7deg, #fddaff 8.2%, #dfadfc 19.6%, #adcdfc 36.8%, #adfcf4 73.2%, #caf8d0 90.9%); */
.app {
  width: 100%;
  height: 100%;
  /* background: #4171b82c; */
  background: #131518d8;
}

html,
body,
h1,
h2,
h3,
p {
  font-family: 'Noto Serif', '微软雅黑', serif;
  user-select: none;
}

.controller {
  position: fixed;
  bottom: 0px;
  right: 0px;

  height: 60px;

}

.controller code {
  line-height: 50px;
  margin: 8px;
  border-radius: 10px;
  padding: 2px 20px;
  height: 50px;
  display: inline-block;
  background: rgba(0, 0, 0, 0.452);
  font-size: 2rem;
  transition: all linear .3s;
  ;
}

.hidden {
  opacity: 0;
}


.menuBox {
  padding: 20px 0px 10px 0px;
  background-color: #f0f8ff6b;
  position: fixed;
  top: -180px;
  width: 100%;
  min-height: 150px;
  z-index: 10;
  border-radius: 0 0 30px 30px;
  transition: all .5s;
  
}

.menuBox.menuBoxOpen {
  -webkit-transform: translateY(180px);
  -moz-transform: translateY(180px);
  -ms-transform: translateY(180px);
  transform: translateY(180px);
}

.widgetsBox {
  transition: all .5s;
  opacity: 0;
  z-index: 1;
  width: 100px;
  height: 100px;
  position: absolute;
  top: -1100px;
}

.widgetsBox.menuBoxOpen {
  /* -webkit-transform: translateY(180px) scale(0.8);
      -moz-transform: translateY(180px) scale(0.8);
      -ms-transform: translateY(180px) scale(0.8); */
  transform: translateY(180px) scale(0.8);
}

a {
  color: #41b883;
  text-decoration: none;
  cursor: pointer;
}

.pageBox {
  min-width: 120px;
  min-height: 110px;

}
.curr{
  opacity: 1;
  z-index: 2;
  top: 0px;
  width: 100%;
  height: 100%;
}

.showText {
  width: 100%;
  border: 0;

  text-align: center;
  font-size: 1.2rem;
  outline: medium;
  color: #ffffff;
  border-radius: 8px;
  background-color: transparent;
}

textarea {
  background: transparent;
  border: 1px solid #41b883;

  resize: none;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  color: rgba(80, 80, 80, 0.826);
}

.addPage {
  border-radius: 10px;
  font-size: 3.2rem;
  color: aliceblue;
  transition: all .5s;
}

.addPage:hover {
  background: #7d7d7d;
  color: rgb(253, 253, 253);
}

.currPage {
  box-shadow: 0 0 16px rgba(104, 244, 128, 0.8);
}</style>
