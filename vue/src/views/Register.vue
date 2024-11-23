<template>
  <el-form ref="registerForm" :model="form" :rules="rules" class="register-form">
    <h1>Register</h1>
    <!-- 用户名输入框 -->
    <el-form-item prop="username" class="register-input-box">
      <el-input v-model="form.username" placeholder="Enter your username">
        <template #suffix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 邮箱输入框 -->
    <el-form-item prop="email" class="register-input-box">
      <el-input v-model="form.email" placeholder="Enter your email">
        <template #suffix>
          <el-icon><Message /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码输入框 -->
    <el-form-item prop="password" class="register-input-box">
      <el-input v-model="form.password" type="password" placeholder="Enter your password">
        <template #suffix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 注册按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleRegister" class="btn">Register</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
import { User, Message, Lock } from "@element-plus/icons-vue";

export default {
  setup() {
    const form = reactive({
      username: "",
      email: "",
      password: "",
    });

    const rules = {
      username: [
        { required: true, message: "Please input your username", trigger: "blur" },
      ],
      email: [
        { required: true, message: "Please input your email", trigger: "blur" },
        { type: "email", message: "Please enter a valid email address", trigger: "blur" },
      ],
      password: [
        { required: true, message: "Please input your password", trigger: "blur" },
        { min: 6, message: "Password must be at least 6 characters long", trigger: "blur" },
      ],
    };

    const registerForm = ref(null);

    const handleRegister = () => {
      registerForm.value.validate((valid) => {
        if (valid) {
          console.log("Registration successful!", form);
        } else {
          console.error("Validation failed");
        }
      });
    };

    return {
      form,
      rules,
      registerForm,
      handleRegister,
    };
  },
};
</script>

<style scoped>

.register-form {
  width: 100%;
}

.register-form h1 {
  text-align: center;
  margin: -10px 0;
}

.register-input-box {
  position: relative;
  margin: 30px 0;
}

.register-input-box .el-input {
  width: 100%;
  height: 48px;
}

.btn {
  width: 100%;
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
