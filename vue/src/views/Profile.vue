<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 个人中心页面
-->

<template>
    <div class="profile">
      <div class="profile-header">
        <h2>个人中心</h2>
      </div>
  
      <el-divider></el-divider>
  
      <!-- 用户信息组件 -->
      <UserInfo @update="updateUserInfo" />
    </div>
  </template>
  
  <script>
  import UserInfo from "@/components/UserInfo.vue";
  
  export default {
    name: "Profile",
    components: { UserInfo },
    data() {
      return {
        // user: {
        //   userName: "",
        //   email: "",
        //   userType: "",
        // },
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
  