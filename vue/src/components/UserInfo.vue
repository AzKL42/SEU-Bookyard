<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 用户信息组件
-->

<template>
    <el-descriptions 
        title="个人信息"
        direction="vertical"
        border
        style="margin-top: 20px"
    >
      <el-descriptions-item
        :rowspan="2"
        :width="140"
        label="Photo"
        align="center"
      >
        <el-image
          style="width: 100px; height: 100px"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
      </el-descriptions-item>
      <el-descriptions-item label="用户名">{{ user.userName }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ user.email }}</el-descriptions-item>
      <el-descriptions-item label="权限">{{ user.userType }}</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="地址">
        No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
    
    <div class="btn-container">
      <el-button type="primary" size="mini" @click="handleEdit" class="btn">修改信息</el-button>
      <el-button type="primary" size="mini" @click="handleChangePwd" class="btn">修改密码</el-button>
    </div>

    <el-divider></el-divider>
    <div style="display: flex; justify-content: space-between; margin-top: 20px">
      <!-- 超期图书 -->
      <el-card style="width: 20%">
        <template #header>
          <div class="card-header">
            <h3>超期图书</h3>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item' + o }}</p>
      </el-card>
      <!-- 预约到书 -->
      <el-card style="width: 20%">
        <template #header>
          <div class="card-header">
            <h3>预约到书</h3>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item' + o }}</p>
      </el-card>
      <!-- 已借图书 -->
      <el-card style="width: 20%">
        <template #header>
          <div class="card-header">
            <h3>已借图书</h3>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item' + o }}</p>
      </el-card>
      <!-- 推荐购书 -->
      <el-card style="width: 20%">
        <template #header>
          <div class="card-header">
            <h3>推荐购书</h3>
          </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item' + o }}</p>
      </el-card>
    </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        userName: "",
        email: "",
        userType: "",
      },
    };
  },
  mounted() {
    let userJson = sessionStorage.getItem("userInfo")
    // console.log(userJson)
    this.userInfo = JSON.parse(userJson)
    // console.log(this.userInfo)
    this.user = this.userInfo.user;
    console.log(this.user)
  },
  methods: {
    handleEdit() {
      this.$router.push("/edit-user-info");
    },
    handleChangePwd() {
      this.$router.push("/change-pwd");
    }
  }
};
</script>

<style scoped>
.btn-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn {
  width: 50%;
  height: 48px;
  background: #7494ec;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

</style>