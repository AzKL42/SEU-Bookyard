<template>
    <div class="profile">
      <div class="profile-header">
        <h2>个人中心</h2>
      </div>
  
      <el-divider></el-divider>
  
      <!-- 用户信息组件 -->
      <UserInfo :user="user" @update="updateUserInfo" />
  
      <el-divider></el-divider>
  
      <!-- 修改密码组件 -->
      <!-- <ChangePassword @password-updated="handlePasswordUpdated" /> -->
    </div>
  </template>
  
  <script>
  import UserInfo from "@/components/UserInfo.vue";
  import ChangePassword from "@/components/ChangePassword.vue";
  
  export default {
    name: "Profile",
    components: { UserInfo, ChangePassword },
    data() {
      return {
        user: {
          name: "John Doe",
          email: "johndoe@example.com",
          phone: "123-456-7890",
        },
      };
    },
    methods: {
      updateUserInfo(updatedUser) {
        this.user = { ...this.user, ...updatedUser };
        this.$message.success("User information updated successfully!");
      },
      handlePasswordUpdated() {
        this.$message.success("Password updated successfully!");
      },
    },
  };
  </script>
  
  <style scoped>
  .profile {
    padding: 20px;
  }
  .profile-header {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  