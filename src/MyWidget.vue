<template>
  <Draggable 
    :style="{ height: us.h + 'px', width: us.w + 'px' }" 
    v-slot="{ x, y }" 
    p="x-4 y-2"
    border="~ gray-400/30 rounded" 
    shadow="~ hover:lg" 
    class="widget demo" 
    :class="{ 'deleting': isDeleting }"
    :storage-key="'xy' + id" 
    storage-type="local"
    :initial-value="{ x: 1000 / 3.6, y: 240 }" 
    :prevent-default="true" 
    :handle="handle"
  >
    <div class="controlbar row">
      <div class="button delete-btn" @click="handleDelete">
        <span>❌</span>
        <div class="delete-confirm" v-if="showDeleteConfirm">
          <button @click.stop="confirmDelete">确认</button>
          <button @click.stop="cancelDelete">取消</button>
        </div>
      </div>
      <div class="button" @click="addClick(true)">🌄</div>
      <div class="button" @click="addClick(false)">📝</div>
      <div ref="handle" class="button">👋</div>
    </div>

    <div style="height:100%;position: relative;">
      <template v-for="w in widgets">
        <MinWidget 
          v-bind:id="'min'+w.id" 
          :is-img="w.isImg"  
          v-bind:ppx="x" 
          v-bind:ppy="y"
          @click="clickId(w.id)"
        ></MinWidget>
      </template>
    </div>

    <div ref="el" class="resize">
      <img src="./imgs/resize.png" style="width: 88%;opacity: .5;" alt="">
    </div>
  </Draggable>
</template>

<script setup lang="ts" name="MyWidget">
import { ref, onMounted, watch } from 'vue'
import { useStyleTag, useMagicKeys, useMousePressed, whenever, useMouse, useStorage } from '@vueuse/core'
import { UseDraggable as Draggable } from '@vueuse/components'
import MinWidget from './MinWidget.vue'
import { Guid } from 'guid-typescript'
import type { MinWidgetData } from './types'

const props = defineProps({
  id: String,
  onDelete: {
    type: Function as PropType<(id: string) => void>,
    default: () => {}
  }
})

// 删除相关状态
const showDeleteConfirm = ref(false)
const isDeleting = ref(false)
const clickid = ref("")

// 删除确认处理
const handleDelete = () => {
  showDeleteConfirm.value = true
}

const confirmDelete = () => {
  isDeleting.value = true
  setTimeout(() => {
    widgets.value = widgets.value.filter(i => i.id !== props.id)
    props.onDelete?.(props.id as string)
  }, 300)
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
}

// 子组件删除处理
const clickId = (cid: string) => {
  clickid.value = cid
}

const { Delete } = useMagicKeys()
watch(Delete, () => {
  if (clickid.value) {
    widgets.value = widgets.value.filter(i => i.id !== clickid.value)
    clickid.value = ""
  }
})

// 组件相关
const widgets = useStorage<MinWidgetData[]>('min-widgets' + props.id, [])

const addClick = (isImg: boolean) => {
  const newWidget: MinWidgetData = {
    id: Guid.create().toString(),
    isImg: isImg
  }
  addWidget(newWidget)
}

const addWidget = (widget: MinWidgetData) => {
  widgets.value = [...widgets.value, widget]
}

// 尺寸调整相关
const us = useStorage('wh' + props.id, { w: 150, h: 100 })
const handle = ref<HTMLElement | null>(null)

const um = useMouse()
const el = ref(null)
const oldx = ref(us.value.w)
const oldy = ref(us.value.h)
const { pressed } = useMousePressed({ target: el })

watch(pressed, () => {
  if (pressed.value) {
    oldx.value = um.x.value
    oldy.value = um.y.value
  }
})

const changeSize = (xx: number, yy: number) => {
  if (pressed.value) {
    us.value.h = us.value.h + (um.y.value - oldy.value)
    us.value.w = us.value.w + (um.x.value - oldx.value)
    oldx.value = um.x.value
    oldy.value = um.y.value
  }
}

watch([um.x, um.y], () => {
  changeSize(um.x.value, um.y.value)
})
</script>

<style scoped>
/* 保持原有样式 */

/* 添加删除相关样式 */
.delete-btn {
  position: relative;
}

.delete-confirm {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px;
  border-radius: 4px;
  display: flex;
  gap: 8px;
  z-index: 100;
}

.delete-confirm button {
  padding: 2px 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.delete-confirm button:first-child {
  background: #ff4444;
  color: white;
}

.delete-confirm button:first-child:hover {
  background: #ff0000;
}

.delete-confirm button:last-child {
  background: #666;
  color: white;
}

.delete-confirm button:last-child:hover {
  background: #444;
}

/* 删除动画 */
.widget.deleting {
  animation: delete-animation 0.3s ease-in forwards;
}

@keyframes delete-animation {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}

/* 原有样式保持不变 */
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

.widget {
  position: fixed;
  background: #68f480;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(104, 244, 128, 0.5);
  transition: all 0.2s linear;
}

.widget:active {
  background-color: #b8fbc3;
  box-shadow: 0 0 16px rgba(104, 244, 128, 0.8);
}

.widget:hover {
  box-shadow: 0 0 22px rgba(104, 244, 128, 0.6);
}
</style>
  