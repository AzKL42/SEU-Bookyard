<template>
  <el-aside width="200px" class="aside-container">
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical"
      @select="handleMenuSelect"
    >
      <!-- 首页 -->
      <el-menu-item index="home">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>

      <!-- 图书目录 -->
      <el-sub-menu index="catalog">
        <template #title>
          <el-icon><Tickets /></el-icon>
          <span>图书目录</span>
        </template>
        <el-menu-item index="catalog-all">
          <el-icon><Grid /></el-icon>
          <span>全部图书</span>
        </el-menu-item>
        <el-menu-item index="catalog-categories">
          <el-icon><Histogram /></el-icon>
          <span>分类目录</span>
        </el-menu-item>
        <el-menu-item index="catalog-new">
          <el-icon><Opportunity /></el-icon>
          <span>新书上架</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 借阅记录 -->
      <el-menu-item index="records">
        <el-icon><Document /></el-icon>
        <span>借阅记录</span>
      </el-menu-item>

      <!-- 快捷服务 -->
      <el-sub-menu index="services">
        <template #title>
          <el-icon><Service /></el-icon>
          <span>快速服务</span>
        </template>
        <el-menu-item index="services-renew">
          <el-icon><Calendar /></el-icon>
          <span>续借</span>
        </el-menu-item>
        <el-menu-item index="services-reserve">
          <el-icon><Management /></el-icon>
          <span>预约</span>
        </el-menu-item>
        <el-menu-item index="services-fines">
          <el-icon><WarningFilled /></el-icon>
          <span>罚款管理</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 公告栏 -->
      <el-menu-item index="announcements">
        <el-icon><Bell /></el-icon>
        <span>公告栏</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { House, Document, Tickets, Service, Bell, Grid, Histogram, Opportunity, Management, WarningFilled } from "@element-plus/icons-vue";

export default {
  name: "Aside",
  data() {
    return {
      activeMenu: "home", // 默认激活的菜单项
    };
  },
  methods: {
    handleMenuSelect(index) {
      console.log("Menu selected:", index);
      // 路由跳转逻辑（根据项目需求修改）
      if (index === "home") {
        this.$router.push("/");
      } else if (index === "catalog-all") {
        this.$router.push("/catalog");
      } else if (index === "records") {
        this.$router.push("/records");
      } else if (index === "services-renew") {
        this.$router.push("/services/renew");
      }
    },
  },
};
</script>

<style scoped>
.aside-container {
  background-color: #f5f7fa;
  height: 100vh; /* 确保侧边栏高度与页面一致 */
  border-right: 1px solid #ebeef5;
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

.el-menu-item {
  font-size: 14px;
}

.el-submenu .el-menu-item {
  font-size: 13px;
}
</style>
