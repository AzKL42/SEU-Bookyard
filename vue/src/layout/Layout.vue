<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 首页布局页面
-->

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
          <div class="module-col-left">
            <Carousel />
          </div>
          <div class="module-col-right">
            <AnnouncementInHome />
          </div>
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
import AnnouncementInHome from "../components/AnnouncementInHome.vue";

export default {
  name: "Layout",
  components:{
    Header,
    Aside,
    Carousel,
    BookRecommendation,
    AnnouncementInHome
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
  flex: 1; /* 元素的宽度占满剩余空间 */
  margin: 0 10px; /* 模块之间的间距 */
}

.module-col-left {
  flex: 5;
}

.module-col-right {
  flex: 3;
}

</style>