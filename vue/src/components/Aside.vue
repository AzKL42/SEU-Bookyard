<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 首页侧边栏组件
-->

<template>
  <div class="aside-wrapper">
    <el-aside :width="isCollapsed ? '64px' : '200px'" class="aside-container">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapsed"
        :collapse-transition="true"
        class="el-menu-vertical"
        @select="handleMenuSelect"
      >
        <!-- 首页 -->
        <el-menu-item index="home">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
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
          <template #title>借阅记录</template>
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
          <template #title>公告栏</template>
        </el-menu-item>

        <!-- 退出登录，逻辑暂时不完整 -->
        <el-menu-item index="logout" class="logout-menu-item">
          <el-icon><Back /></el-icon>
          <template #title>退出登录</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 控制按钮 -->
    <div class="toggle-button" @click="toggleSidebar">
      <el-icon>
        <template v-if="isCollapsed"><Expand /></template>
        <template v-else><Fold /></template>
      </el-icon>
    </div>
  </div>
</template>

<script>
import { House, Document, Tickets, Service, Bell, Grid, Histogram, Opportunity, Management, WarningFilled, Folder } from "@element-plus/icons-vue";

export default {
  name: "Aside",
  data() {
    return {
      activeMenu: "home", // 默认激活的菜单项
      isCollapsed: false, // 侧边栏是否折叠
      isLoggedIn: true, // 是否登录
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleMenuSelect(index) {
      console.log("Menu selected:", index);
      // 路由跳转逻辑（根据项目需求修改）
      if (index === "home") {
        this.$router.push("/");
      } else if (index === "catalog-all") {
        this.$router.push("/catalog");
      } else if (index === "catalog-categories") {
        this.$router.push("/catalogbycategory");
      } else if (index === "records") {
        this.$router.push("/records");
      } else if (index === "services-renew") {
        this.$router.push("/services/renew");
      } else if (index === "services-reserve") {
        this.$router.push("/services/reserve");
      } else if (index === "announcements") {
        this.$router.push("/announcements");
      } else if (index === "logout") {
        console.log("Logging out");
        this.isLoggedIn = false;
      }
    },
  },
};
</script>

<style scoped>
.aside-wrapper {
  display: flex;
  height: 100vh;
}

.aside-container {
  background-color: #f5f7fa;
  border-right: 1px solid transparent;
  transition: width 0.3s ease;
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

.logout-menu-item {
  bottom: 0%;
  position: absolute;
  background-color: #f5f7fa;
  width: 100%;
}

/* 控制按钮样式 */
.toggle-button {
  width: 32px;
  height: 100%;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-left: 1px solid transparent;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background-color: #dcdfe6;
}
</style>