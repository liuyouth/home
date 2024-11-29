<template>
  <div class="home-page">
    <div class="nav-menu">
      <div class="menu-item" @click="navigateToGallery">
        <div class="icon">🖼️</div>
        <div class="title">图片展示</div>
      </div>
      <div class="menu-item" @click="navigateToWhiteboard">
        <div class="icon">📝</div>
        <div class="title">白板</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToGallery = () => {
  router.push('/gallery')
}

const navigateToWhiteboard = () => {
  router.push('/whiteboard')
}
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #131518d8;
}

.nav-menu {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  width: 100%;
}

.menu-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.title {
  color: white;
  font-size: 1.2rem;
}
</style> 