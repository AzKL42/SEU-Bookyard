<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 修改密码页面
-->

<template>
    <div class="change-user-info">
      <!-- 页头 -->
      <el-page-header @back="goBack" title="返回">
  
      </el-page-header>
  
      <el-divider></el-divider>
  
      <div class="change-user-info-header">
        <h2>修改信息</h2>
      </div>
  
      <el-divider></el-divider>
  
      <el-form ref="userInfoForm" :model="form" label-width="150px" :rules="rules" class="change-user-info-form">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" v-model="form.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新用户名" prop="newUserName">
          <el-input type="text" v-model="form.newUserName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="form.email" autocomplete="off" />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="updateInfo" class="updateUserInfoBtn">更新信息</el-button>
          <el-button type="default" @click="resetForm" class="resetFormBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
    
  <script>
  import request from '@/utils/request';
  
  export default {
    name: "ChangeUserInfo",
    data() {
      return {
        form: {
          userName: "",
          newUserName: "",
          email: "",
        },
        rules: {
          userName: [{ required: true, message: "Username is required", trigger: "blur" }],
          newUserName: [{ required: true, message: "Username is required", trigger: "blur" }],
          email: [
            { required: true, message: "Email is required", trigger: "blur" },
            // { message: "Please enter a valid email", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      updateInfo() {
        this.$refs.userInfoForm.validate((valid) => {
          if (valid) {
            const payload = {
              userName: this.form.userName,
              newUserName: this.form.newUserName,
              email: this.form.email,
            };
  
            request.post('/user/changeUserInfo', payload)
              .then(response => {
                console.log('Password updated successfully:', response.data);
                this.goBack();
                this.$message.success('信息更新成功');
              })
              .catch(error => {
                console.error('Error updating password:', error.response.data);
                this.$message.error('信息更新失败');
              });
          }
        });
      },
      resetForm() {
        this.$refs.userInfoForm.resetFields();
      },
      goBack() {
        this.$router.push("/profile");
      },
    },
  };
  </script>
    
  <style scoped>
  .change-user-info-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .change-user-info {
    margin-top: 20px;
  }
  
  .change-user-info-form {
    max-width: 90%;
    text-align: center;
  }
  
  .el-page-header {
    margin-left: 20px;
  }
  
  .updateUserInfoBtn {
    width: 20%;
    height: 36px;
    background: #7494ec;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
  }
  
  .resetFormBtn {
    width: 20%;
    height: 36px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
  }
  </style>
    