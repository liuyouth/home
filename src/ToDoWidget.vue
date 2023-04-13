<template>
    <div ref="el" :style="style" style="width: 320px;" class="widget">
        ⏱️ {{word}}
        <br>
        <h3>现在的修改文字是格式布局比较难弄</h3>
         解决办法可能是每个widget 只有一行字 自动居中 不使用 textarea 展示
        <br>
        
        <h3>修改字体大小颜色</h3>
        鼠标移动上去显示控制条，目前有拖动，需要新增 编辑按钮，点击编辑后右侧出来div 可以编辑css 改变颜色使用定制css 来实现

        <br>
        插入图片
       有个min widget 的想法，
       min widget 添加是用父组件的按钮实现的， 可以添加
       单个 文本 
       单个图片 
       MyWidget 持久化minwidget 列表
       MyWidget 添加 文本 添加图片 MinWidget
       修改文本  暂时使用 input 实现
       图片不可修改，可以删除widget 然后在新建
       新建图片 出现addWidget 可以通过网络连接加载，也可以通过本地上传。
      
       就是每个文字 每个图片都是自定义的 都是可以拖动的，但是他们是属于一个大widget的
       每个文字 每个图片都可以选择 样式 
       <h3>右键功能</h3>
    </div>
</template>
  
<script setup lang="ts" name="myWidget">
import { ref, onMounted } from 'vue'
import { useMouse, useCounter } from '@vueuse/core'
import { useDraggable ,useIntervalFn } from '@vueuse/core'
import { rand } from '@vueuse/shared'
const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const { pause, resume, isActive } = useIntervalFn(() => {
  word.value =  new Date().toISOString().split('T')[0] + " "+new Date().toISOString().split('T')[1].substring(0,8)
}, 800)

// const { x, y } = useMouse()
const { count, inc, dec } = useCounter()

const el = ref<HTMLElement | null>(null)


// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
    initialValue: { x: 40, y: 540 },
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
  