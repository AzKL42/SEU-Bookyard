<template>
    <Header />
    <!--    主体-->
    <div style="display: flex">
      <!--      侧边栏-->
      <Aside />
      <!--      内容区域-->
      <router-view style="flex: 1"/>
    </div>
    <!-- <Main /> -->
  </template>
  
  <script>
  
  import Header from "../components/Header.vue";
  import Aside from "../components/Aside.vue";
  // import Main from "../components/Main.vue";
  export default {
    name: "Layout",
    components:{
      Header,
      Aside,
      // Main
    }
  }
  </script>
  
  <style scoped>
  
  </style>