<template>
  <!-- <Toggle /> -->
  <!-- <Menu /> -->
  <router-link to="/Home">首页</router-link>
  <router-link to="/Login">Toggle</router-link>
  <router-view />
</template>

<script setup>
import Toggle from './views/Toggle.vue';
import Menu from './views/Home.vue';

</script>

<style >

</style>