<template>
  <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
    <h1>Login</h1>
    <!-- 用户名输入框 -->
    <el-form-item prop="username" class="login-input-box">
      <el-input v-model="form.username" placeholder="Enter your username">
        <template #suffix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码输入框 -->
    <el-form-item prop="password" class="login-input-box">
      <el-input v-model="form.password" type="password" placeholder="Enter your password">
        <template #suffix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 忘记密码 -->
    <el-form-item class="forgot-link">
      <el-link href="#">Forgot Password?</el-link>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleLogin" class="btn">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";

export default {
  setup() {
    const form = reactive({
      username: "",
      password: "",
    });

    const rules = {
      username: [
        { required: true, message: "Please input your username", trigger: "blur" },
      ],
      password: [
        { required: true, message: "Please input your password", trigger: "blur" },
      ],
    };

    const loginForm = ref(null);

    const handleLogin = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          console.log("Login successful!", form);
        } else {
          console.error("Validation failed");
        }
      });
    };

    return {
      form,
      rules,
      loginForm,
      handleLogin,
    };
  },
};
</script>

<style scoped>
.login-form {
  width: 100%;
}

.login-form h1 {
  text-align: center;
  margin: -10px 0;
}

.login-input-box {
  position: relative;
  margin: 30px 0;
}

.login-input-box .el-input {
  width: 100%;
  height: 48px;
}

.forgot-link {
  margin-top: -15px 0 15px;
}

.forgot-link .el-link {
  font-size: 14.5px;
  color: #333;
  text-decoration: none;
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
