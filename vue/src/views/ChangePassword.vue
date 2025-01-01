<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 修改密码页面
-->

<template>
  <div class="change-password">
    <!-- 页头 -->
    <el-page-header @back="goBack" title="返回">

    </el-page-header>

    <el-divider></el-divider>

    <div class="change-password-header">
      <h2>修改密码</h2>
    </div>

    <el-divider></el-divider>

    <el-form ref="passwordForm" :model="form" label-width="150px" :rules="rules" class="change-password-form">
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" v-model="form.email" autocomplete="off" />
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword" autocomplete="off" />
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="updatePassword" class="updatePasswordBtn">更新密码</el-button>
        <el-button type="default" @click="resetForm" class="resetFormBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import request from '@/utils/request';

export default {
  name: "ChangePassword",
  data() {
    return {
      form: {
        userName: "",
        newPassword: "",
        confirmPassword: "",
        email: "",
      },
      rules: {
        userName: [{ required: true, message: "Username is required", trigger: "blur" }],
        newPassword: [{ required: true, message: "New password is required", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "Please confirm your password", trigger: "blur" },
          { validator: this.validateConfirmPassword, trigger: "blur" },
        ],
        email: [
          { required: true, message: "Email is required", trigger: "blur" },
          // { message: "Please enter a valid email", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error("Passwords do not match"));
      } else {
        callback();
      }
    },
    updatePassword() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          const payload = {
            userName: this.form.userName,
            email: this.form.email,
            password: this.form.newPassword,
          };

          request.post('/user/changePwd', payload)
            .then(response => {
              console.log('Password updated successfully:', response.data);
              this.goBack();
              this.$message.success('密码更新成功');
            })
            .catch(error => {
              console.error('Error updating password:', error.response.data);
              this.$message.error('密码更新失败');
            });
        }
      });
    },
    resetForm() {
      this.$refs.passwordForm.resetFields();
    },
    goBack() {
      this.$router.push("/profile");
    },
  },
};
</script>
  
<style scoped>
.change-password-header {
  text-align: center;
  margin-bottom: 20px;
}

.change-password {
  margin-top: 20px;
}

.change-password-form {
  max-width: 90%;
  text-align: center;
}

.el-page-header {
  margin-left: 20px;
}

.updatePasswordBtn {
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
  