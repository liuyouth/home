<template>
    <div ref="el" :style="style" style="width: 320px;" class="widget">
        👋 {{word}}，
        <br>
        这里是梦蓝，你的梦想蓝图
        <br>
        不同以往的白板以及待办，我们这里没有自由画笔🖌，一切都是widget，
        您可以自由创建拖动widget，widget的内容是通过模板来添加的。
        按住右下角可以改变widget大小持久化保存。
        点击进入编辑模式直接修改文本
        为了简洁和美观一些操作使用快捷键进行完成。
        <br>
        以下是快捷键列表<br><br>（由于技术原因快捷键<span>Ctrl</span>需要最后按才可以🌚 知道如何解决的朋友可以私信）
        <br><br>
        需要添加widget的时候按 <span>A</span> +<span>D</span>+<span>Ctrl</span>
        <br><br>
        在widget内的minwidget删除时候先点击一下widget然后按下  <span>del</span> 即可
        <br><br>
        需要需要帮助的时候按 <span>H</span> +<span>Ctrl</span>
        <br>
        <br>
        呼出页面菜单 <span>M</span> +<span>Ctrl</span>
        <br>
        👋 Drag me!
    </div>
</template>
  
<script setup lang="ts" name="myWidget">
import { ref, onMounted } from 'vue'
import { useMouse, useCounter } from '@vueuse/core'
import { useDraggable ,useIntervalFn} from '@vueuse/core'
import { rand } from '@vueuse/shared'
const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const { pause, resume, isActive } = useIntervalFn(() => {
  word.value = greetings[rand(0, greetings.length - 1)]
}, 800)

// const { x, y } = useMouse()
const { count, inc, dec } = useCounter()

const el = ref<HTMLElement | null>(null)


// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 40 },
})

onMounted: () => {
    const el22 = ref<HTMLElement | null>(document.getElementById("el2"))
    const ud = useDraggable(el22, {
        initialValue: { x: 1240, y: 240 },
    })
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

span {
    padding: 3px;
    border-radius: 3px;
    background: #71717174;
    border: 1px solid #57575774;
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
    background-color: #b8fbc3;
    box-shadow: 0 0 12px rgba(104, 244, 128, 0.6);
}</style>
  