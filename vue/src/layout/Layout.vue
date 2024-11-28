<template>
  <Header />
  <!--    主体-->
  <div style="display: flex">
    <!--      侧边栏-->
    <Aside />
    <!--      主内容区域-->
    <div style="display: flex; flex-direction: column; width: 100%;">
      <!-- 静态模块 -->
      <template v-if="$route.name === 'Home'">
        <div class="module-row">
          <Carousel />
          <Announcement />
        </div>
        <div class="module-row">
          <BookRecommendation />
        </div>
      </template>
      <!-- 动态模块 -->
      <router-view style="flex: 1"/> <!--style="flex: 1" 表示这个元素会占据剩余的所有可用空间-->
    </div>
  </div>
</template>
  
<script>

import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";
import Carousel from "../components/Carousel.vue";
import BookRecommendation from "../components/BookRecommendation.vue";
import Announcement from "../components/Announcement.vue";

export default {
  name: "Layout",
  components:{
    Header,
    Aside,
    Carousel,
    BookRecommendation,
    Announcement
  }
}
</script>

<style scoped>

.module-row {
  display: flex;
  justify-content: space-between; /* 模块之间有间距 */
  width: 100%;
  margin-bottom: 20px; /* 模块行之间的间距 */
  margin-top: 10px; /* 模块行与顶部的间距 */
}

.module-row > * {
  flex: 1; /* 每个模块占据相等的空间 */
  margin: 0 10px; /* 模块之间的间距 */
}

</style>