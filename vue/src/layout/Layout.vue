<template>
  <Header />
  <!--    主体-->
  <div style="display: flex">
    <!--      侧边栏-->
    <Aside />
    <!--      主内容区域-->
    <div>
      <!-- 静态模块 -->
      <template v-if="$route.name === 'Home'">
        <Carousel />
        <!-- <BookRecommendation />
        <QuickService />
        <Announcement /> -->
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
// import BookRecommendation from "../components/BookRecommendation.vue";
// import QuickService from "../components/QuickService.vue";
// import Announcement from "../components/Announcement.vue";

export default {
  name: "Layout",
  components:{
    Header,
    Aside,
    Carousel,
  }
}
</script>

<style scoped>

</style>