<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 登录页面
-->

<template>
  <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
    <h1>东大书苑登录</h1>
    <!-- 用户名输入框 -->
    <el-form-item prop="username" class="login-input-box">
      <el-input v-model="form.username" placeholder="请输入用户名">
        <template #suffix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码输入框 -->
    <el-form-item prop="password" class="login-input-box">
      <el-input v-model="form.password" type="password" placeholder="请输入密码">
        <template #suffix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 验证码输入框 -->
    <el-form-item class="login-input-box" prop="verificationCode">
        <div style="display: flex">
          <el-input  v-model="form.verificationCode"  placeholder="请输入验证码">
            <template #suffix>
              <el-icon><Promotion /></el-icon>
            </template>
            <template #append>
              <ValidCode v-model="form.verificationCode" class="valid-code" @input="createValidCode" />
            </template>
          </el-input>          
        </div>
    </el-form-item>

    <!-- 忘记密码 -->
    <el-form-item class="forgot-link">
      <el-button type="text" @click="$router.push('/forget')">忘记密码?</el-button>
    </el-form-item>

    <!-- 登录按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleLogin" class="btn">登录</el-button>
    </el-form-item>

    <!-- 测试按钮 -->
    <el-form-item>
      <el-button type="primary" @click="$router.push('/')" class="btn">直接登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";

import request from "../utils/request";
import {ElMessage} from "element-plus";
import ValidCode from "../components/Validate.vue";

export default {
  name: "Login",
  components: {
    ValidCode,
  },
  setup() {
    const form = reactive({
      username: "",
      password: "",
      verificationCode: "",
    });

    const rules = {
      username: [
        { required: true, message: "Please input your username", trigger: "blur" },
      ],
      password: [
        { required: true, message: "Please input your password", trigger: "blur" },
      ],
      verificationCode: [
        { required: true, message: "Please input verification code", trigger: "blur" },
      ],
    };

    const loginForm = ref(null);

    const createValidCode = (value) => {
      // form.verificationCode = value;
    };

    const handleLogin = () => {
      // loginForm.value.validate((valid) => {
      //   // if (valid) {
      //   //   // 调用后端接口进行登录验证
      //   //   request.post("/api/login", {
      //   //     username: form.username,
      //   //     password: form.password,
      //   //     verificationCode: form.verificationCode
      //   //   }).then(response => {
      //   //     if (response.data.success) {
      //   //       ElMessage.success("Login successful!");
      //   //       // 跳转到主页或其他页面
      //   //       // this.$router.push("/");
      //   //     } else {
      //   //       ElMessage.error("Login failed: " + response.data.message);
      //   //     }
      //   //   }).catch(error => {
      //   //     ElMessage.error("Request error: " + error.message);
      //   //   });
      //   // } else {
      //   //   console.error("Validation failed");
      //   // }
      // });
    };

    return {
      form,
      rules,
      loginForm,
      handleLogin,
      createValidCode
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
