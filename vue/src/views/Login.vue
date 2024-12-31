<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 登录页面
-->

<template>
  <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
    <h1>东大书苑登录</h1>
    <!-- 用户名输入框 -->
    <el-form-item prop="userName" class="login-input-box">
      <el-input v-model="form.userName" placeholder="请输入用户名">
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
    <el-form-item prop="verificationCode" class="login-input-box">
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
import router from "@/router";

export default {
  name: "Login",
  components: {
    ValidCode,
  },
  setup() {
    const form = reactive({
      userName: "t4",
      password: "123456",
      verificationCode: "",
    });

    const rules = {
      userName: [
        { required: true, message: "请输入用户名", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
      ],
      verificationCode: [
        { required: true, message: "请输入验证码", trigger: "blur" },
      ],
    };

    const loginForm = ref(null);

    const createValidCode = (value) => {
      form.verificationCode = value;
    };

    const handleLogin = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          request.post('/user/login', {
            userName: form.userName,
            password: form.password,
          }).then(response => {
            console.log('Response:', response); // Debugging line to see the actual response
            console.log(typeof response.data)

            // 检查 response 和 response.data 是否存在并且是对象
            if (response && typeof response.data === 'object') {
              const responseData = response.data;

              // 如果有 message 字段，则显示成功消息
              if (responseData.message) {
                ElMessage.success("登录成功！");
                // sessionStorage.setItem('userInfo', JSON.stringify({ token: response.headers['Authorization'] }));
                sessionStorage.setItem('userInfo', JSON.stringify(responseData));
                // console.log(router)
                router.push('/');
              } else {
                // 如果没有 message 字段，可能需要检查其他字段或直接显示默认成功消息
                ElMessage.success("登录成功！");
                // sessionStorage.setItem('userInfo', JSON.stringify({ token: response.headers['Authorization'] }));
                sessionStorage.setItem('userInfo', JSON.stringify(responseData));
                router.push('/');
              }
            } else {
              ElMessage.error("服务器返回的数据格式不正确");
            }
          }).catch(error => {
            console.error('Error:', error); // Debugging line to see the actual error

            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              console.error(`Error: ${error.response.status}, Message: ${error.response.statusText}`);
              ElMessage.error(`请求错误：${error.response.status} - ${error.response.statusText}`);

              // 检查是否有 data 字段，并进一步检查 message 或 error 字段
              if (error.response.data && typeof error.response.data === 'object') {
                ElMessage.error(error.response.data.message || error.response.data.error || "未知错误");
              }
            } else if (error.request) {
              // 请求已发出，但没有收到响应
              console.error('No response received');
              ElMessage.error('网络连接错误');
            } else {
              // 发起请求时发生了某些错误
              console.error('Error setting up the request:', error.message);
              ElMessage.error('请求设置错误');
            }
          });
        } else {
          console.error("验证失败");
        }
      });
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
