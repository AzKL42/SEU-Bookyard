<template>
  <el-container class="layout-container-demo">
    <!-- 左侧导航栏 -->
    <el-aside width="200px" class="aside-menu">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '2']" router>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>用户管理
            </template>
            <el-menu-item index="1-1">用户列表</el-menu-item>
            <el-menu-item index="1-2">权限设置</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>图书管理
            </template>
            <el-menu-item index="2-1">图书列表</el-menu-item>
            <el-menu-item index="2-2">分类管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>借阅管理
            </template>
            <el-menu-item index="3-1">借阅记录</el-menu-item>
            <el-menu-item index="3-2">预约管理</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon><setting /></el-icon>统计与报告
            </template>
            <el-menu-item index="4-1">数据统计</el-menu-item>
            <el-menu-item index="4-2">报告生成</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <!-- 主体内容 -->
    <el-container>
      <!-- 顶部工具栏 -->
      <el-header class="header">
        <div class="toolbar">
          <el-icon><setting /></el-icon>
          <el-dropdown>
            <span class="el-dropdown-link">管理员</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 中间主内容 -->
      <el-main>
  <div class="background-container">
    <!-- 背景图片 -->
    <div class="background-image"></div>
  </div>
</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue';

// 假数据填充
const item = {
  date: '2024-11-01',
  name: '张三',
  address: '河南省南阳市桐柏县',
};
const tableData = ref(Array.from({ length: 10 }).fill(item));
</script>

<style scoped>
/* 主容器样式 */
.layout-container-demo {
  height: 100vh;
  background-color: #f4faff; /* 蓝色背景 */
  color: #333;
}

/* 顶部工具栏样式 */
.header {
  height: 60px;
  background-color: #7494ec; /* 蓝色主题 */
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toolbar .el-icon {
  font-size: 20px;
}

/* 左侧导航菜单样式 */
.aside-menu {
  background-color: #edf2fc; /* 浅蓝色背景 */
  color: #333;
}

.el-menu {
  background-color: transparent;
  border-right: none;
}

.el-menu-item,
.el-sub-menu__title {
  font-size: 16px;
}

/* 主内容区域样式 */
.background-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-image: url('../../public/book-background.jpg'); /* 确保图片路径正确 */
  background-size: cover;
  background-position: center;
  filter: brightness(0.8); /* 调暗背景图片 */
  z-index: 1; /* 背景层 */
  opacity: 1;
}

.main-table {
  width: 80%;
  margin-top: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>