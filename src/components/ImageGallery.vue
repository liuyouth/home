<template>
  <div class="image-gallery">
    <div v-for="image in images" :key="image.w" class="image-container">
      <img 
        :width="image.w" 
        :height="image.h" 
        :src="image.data" 
        class="gallery-image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImageData } from '../types/types'

defineProps<{
  images: ImageData[]
}>()
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.image-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: scale(1.05);
}

.gallery-image {
  display: block;
  object-fit: cover;
}
</style> 