<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 首页轮播图（走马灯）组件
-->

<template>
  <el-carousel :interval="4000" type="card" height="480px">
    <el-carousel-item v-for="(image, index) in images" :key="index">
      <img :src="image.src" :alt="image.alt" class="carousel-image" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: "/img/book1.jpg", alt: "Book 1" },
        { src: "/img/book2.jpg", alt: "Book 2" },
        { src: "/img/book3.jpg", alt: "Book 3" },
      ]
    };
  }
};
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片比例 */
  border-radius: 8px; /* 圆角样式，可根据需求调整 */
}
</style>
