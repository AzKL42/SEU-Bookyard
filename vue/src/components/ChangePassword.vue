<template>
    <div class="change-password">
      <h3>修改密码</h3>
  
      <el-form ref="passwordForm" :model="form" label-width="150px" :rules="rules">
        <el-form-item label="Current Password" prop="currentPassword">
          <el-input type="password" v-model="form.currentPassword" autocomplete="off" />
        </el-form-item>
  
        <el-form-item label="New Password" prop="newPassword">
          <el-input type="password" v-model="form.newPassword" autocomplete="off" />
        </el-form-item>
  
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input type="password" v-model="form.confirmPassword" autocomplete="off" />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="updatePassword">Update Password</el-button>
          <el-button type="default" @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChangePassword",
    data() {
      return {
        form: {
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        },
        rules: {
          currentPassword: [{ required: true, message: "Current password is required", trigger: "blur" }],
          newPassword: [{ required: true, message: "New password is required", trigger: "blur" }],
          confirmPassword: [
            { required: true, message: "Please confirm your password", trigger: "blur" },
            { validator: this.validateConfirmPassword, trigger: "blur" },
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
            this.$emit("password-updated");
            this.resetForm();
          }
        });
      },
      resetForm() {
        this.$refs.passwordForm.resetFields();
      },
    },
  };
  </script>
  
  <style scoped>
  .change-password {
    margin-top: 20px;
  }
  </style>
  