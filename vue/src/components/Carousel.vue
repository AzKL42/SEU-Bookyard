<template>
    <div class="carousel" @mouseenter="stopAutoplay" @mouseleave="startAutoplay"> <!-- 鼠标移入停止自动播放，鼠标移出开始自动播放 -->
      <!-- 图片区域 -->
      <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }"> <!-- 图片通过 translateX 实现滑动效果 -->
        <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.src"
          :alt="image.alt"
        />
      </div>
  
      <!-- 控制按钮 -->
      <button @click="prev" class="carousel-control prev">←</button>
      <button @click="next" class="carousel-control next">→</button>
  
      <!-- 指示器 -->
      <div class="carousel-indicators">
        <span
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="goTo(index)"
        ></span> <!-- 动态生成： 使用 v-for 根据图片数组生成指示器 --> <!--  点击指示器触发 goTo 方法，更新当前图片索引 -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
          { src: "/img/book1.jpg", alt: "Image 1" },
          { src: "/img/book2.jpg", alt: "Image 2" },
          { src: "/img/book3.jpg", alt: "Image 3" },
          { src: "/img/book4.jpg", alt: "Image 4" },
        ],
        currentIndex: 0,
        autoplayInterval: null,
      };
    },
    methods: {
      next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      },
      prev() {
        this.currentIndex =
          (this.currentIndex - 1 + this.images.length) % this.images.length;
      },
      goTo(index) {
        this.currentIndex = index;
      },
      startAutoplay() {
        if (!this.autoplayInterval) {
          this.autoplayInterval = setInterval(() => {
            this.next();
          }, 4000); // 每隔3秒切换到下一张图片
        }
      },
      stopAutoplay() {
        if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
          this.autoplayInterval = null;
        }
      },
    },
    mounted() {
      this.startAutoplay();
    },
    beforeUnmount() {
      this.stopAutoplay();
    },
  };
  </script>
  
  <style scoped>
  .carousel {
    position: relative;
    width: 500px;
    overflow: hidden;
  }
  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out; /* 使用 transition 添加平滑切换效果 */
  }
  .carousel-inner img {
    width: 100%;
    flex-shrink: 0;
  }
  
  /* 控制按钮 */
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .prev {
    left: 10px;
  }
  .next {
    right: 10px;
  }
  
  /* 指示器 */
  .carousel-indicators {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .carousel-indicators span {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
  }
  .carousel-indicators span.active { /* 高亮显示： 使用 active 类表示当前图片对应的指示器 */
    background-color: #333;
  }
  </style>
  