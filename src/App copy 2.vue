<template>
  <div class="whiteboard">
    <input v-model="divs" type="text">
    <button @click="addNewDiv">Add New Div</button>
    <div v-for="item in items" :key="item.id" :style="item.ud.style" :ref="'el' + item.id" class="widget">
      {{ item.top + ' ' + item.left }}
    </div>
    <!-- <div v-for="(div, index) in divs" :key="index" class="whiteboard__div" :style="{
      top: div.top + 'px',
      left: div.left + 'px',
      width: div.width + 'px',
      height: div.height + 'px',
    }" v-draggable="{ x: div.left, y: div.top, onEnd: (pos) => updateDivPosition(pos, index) }"
      v-movable="{ onResize: (size) => updateDivSize(size, index) }"> -->
    <!-- <div class="whiteboard__handle"></div>
      <div class="whiteboard__content">
        <p>This is a new div</p>
      </div> -->

  </div>
</template>
 
<script>
import { reactive, toRefs, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { Guid } from 'guid-typescript';
import { useDraggable } from '@vueuse/core'
export default {
  name: 'Whiteboard',
  setup() {
    // 初始化divs数组
    const myGuid = Guid.create();
    const divs = useStorage('whiteboard-divs', [])
    var items = [];
    const setDivs = (v) => {
      divs.value = v
      refresh()
    }
    refresh();
    const refresh = () => {
      newitems = divs.value
      newitems.forEach((item) => {

        var ud = useDraggable(ref('el' + item.id), {
          initialValue: { x: item.left, y: item.top },
        })
        item.ud = ud
      })
      items = newitems
    }



    // 添加新的div
    const addNewDiv = () => {


      setDivs([...divs.value, { id: myGuid.toString(), top: 0, left: 0, width: 200, height: 200 }])

    }

    // 更新div的位置
    const updateDivPosition = (pos, index) => {
      const newDivs = [...divs.value]
      newDivs[index].top = pos.y
      newDivs[index].left = pos.x
      setDivs(newDivs)
    }

    // 更新div的大小
    const updateDivSize = (size, index) => {
      const newDivs = [...divs.value]
      newDivs[index].width = size.width
      newDivs[index].height = size.height
      setDivs(newDivs)
    }



    return {
      items,
      ...toRefs(reactive({ divs })),
      addNewDiv,
      updateDivPosition,
      updateDivSize,
    }
  },
}
</script>

<style scoped>
.whiteboard {
  position: relative;
  width: 100%;
  height: 100%;
}

.whiteboard__div {
  position: absolute;
  border: 1px solid black;
  box-sizing: border-box;
  background-color: white;
  resize: both;
  overflow: auto;
}

.whiteboard__handle {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  background-color: red;
  cursor: move;
}

.whiteboard__content {
  padding: 10px;
}

button {
  margin-bottom: 10px;
}

/* 未拖动时候样式 */
.widget {
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
