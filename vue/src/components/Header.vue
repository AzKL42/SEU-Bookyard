<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 首页头部组件
-->

<template>
  <el-header class="header-container">
    <!-- 左侧：Logo和名称 -->
    <div class="header-left">
      <img src="../assets/icon/login.png" alt="Library Logo" class="logo" />
      <span class="library-name">东大书苑</span>
    </div>

    <!-- 中间：搜索框 -->
    <div class="header-center">
      <el-input
        v-model="searchQuery"
        placeholder="搜索书名、作者或分类"
        clearable
        class="search-input"
      >
        <template #append>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
          </el-button>
        </template>
      </el-input>
    </div>

    <!-- 右侧：导航链接和用户按钮 -->
    <div class="header-right">
      <!-- 导航链接 -->
      <nav class="nav-links">
        <el-link href="/" type="info">首页</el-link>
        <el-link href="/catalog" type="info">书目</el-link>
        <el-link href="/records" type="info">借阅记录</el-link>
        <el-link href="/profile" type="info">个人中心</el-link>
        <el-link v-if="isAdmin" href="/bookentry" type="info">图书入库</el-link>
        <el-link v-if="isAdmin" href="/usermanagement" type="info">用户管理</el-link>
      </nav>

      <!-- 用户动作按钮 -->
      <div class="user-actions">
        <!-- <el-button v-if="!isLoggedIn" type="primary" @click="goToLogin">登录</el-button>
        <el-button v-if="!isLoggedIn" type="success" @click="goToRegister">注册</el-button> -->
        <div class="user-info">
          <el-dropdown>
            <span class="el-dropdown-link">
              你好，{{ user.userName }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="goToProfile">个人资料</el-dropdown-item>
                <el-dropdown-item @click.native="handleLogout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import { Search, ArrowDown, Sunny, Hide } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import router from "@/router";

export default {
  name: "Header",
  data() {
    return {
      searchQuery: "",
      isAdmin: false,
      user: [],
    };
  },
  mounted() {
    let userJson = sessionStorage.getItem("userInfo")
    if(!userJson)
    {
      router.push("/login")
      return;
    }
    // console.log(userJson)
    this.userInfo = JSON.parse(userJson)
    // console.log(this.userInfo)
    this.user = this.userInfo.user;
    this.isAdmin = this.userInfo.user.userType === "admin";
    console.log(this.user)
  },
  methods: {
    handleSearch() {
      // 模拟搜索功能
      console.log("Searching for:", this.searchQuery);
    },
    goToLogin() {
      console.log("Navigating to Login page");
      this.$router.push("/login");
    },
    goToRegister() {
      console.log("Navigating to Register page");
      this.$router.push("/register");
    },
    goToProfile() {
      console.log("Navigating to Profile page");
      this.$router.push("/profile");
    },
    handleLogout() {
      sessionStorage.removeItem("userInfo");
      this.$router.push("/login");
      ElMessage.success("登出成功");
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #e2e2e2, #c9d6ff);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  padding-top: 5px;
  padding-right: 10px;
}

.library-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.header-center {
  flex-grow: 1;
  margin: 0 20px;
}

.search-input {
  width: 100%;
  max-width: 500px;
}

.header-right {
  display: flex;
  align-items: center;
}

.nav-links {
  display: flex;
  margin-right: 20px;
}

.nav-links a {
  margin: 0 10px;
  font-size: 16px;
}

.nav-links .el-link {
  color: #333;
}

.user-actions {
  display: flex;
  align-items: center;
}

.user-info {
  font-size: 16px;
  color: #333;
  cursor: pointer;
}

.el-dropdown-link {
  display: flex;
  font-size: 15px;
  align-items: center;
  font-weight: bold;
  margin-top: 4px; /* 手动调整下拉菜单的位置，不是很好 */ 
}

</style>
