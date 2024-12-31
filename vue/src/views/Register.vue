<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 注册页面
-->

<template>
  <el-form ref="registerForm" :model="form" :rules="rules" class="register-form">
    <h1>注册</h1>
    <!-- 用户名输入框 -->
    <el-form-item prop="userName" class="register-input-box">
      <el-input v-model="form.userName" placeholder="请输入用户名">
        <template #suffix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 邮箱输入框 -->
    <el-form-item prop="email" class="register-input-box">
      <el-input v-model="form.email" placeholder="请输入邮箱地址">
        <template #suffix>
          <el-icon><Message /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 密码输入框 -->
    <el-form-item prop="password" class="register-input-box">
      <el-input v-model="form.password" type="password" placeholder="请输入密码">
        <template #suffix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- 验证码输入框 -->
    <el-form-item class="register-input-box" prop="verificationCode">
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

    <!-- 注册按钮+是否注册为管理员 -->
    <div class="register-button-group">
      <el-form-item>
        <el-button type="primary" @click="handleRegister" class="btn">注册</el-button>
      </el-form-item>
      
      <!-- 是否注册为管理员 -->
      <el-form-item prop="userType" class="admin-checkbox">
        <el-checkbox v-model="form.userType" :true-label="'admin'" :false-label="'normal'">管理员</el-checkbox>
      </el-form-item>
    </div>

  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
import { User, Message, Lock } from "@element-plus/icons-vue";
import request from "../utils/request";
import {ElMessage} from "element-plus";
import ValidCode from "../components/Validate.vue";
import router from "@/router";

export default {
  components: {
    ValidCode,
  },
  setup() {
    const form = reactive({
      userName: "",
      email: "",
      password: "",
      verificationCode: "",
      userType: 'normal', // 默认选择普通用户
    });

    const rules = {
      userName: [
        { required: true, message: "请输入用户名", trigger: "blur" },
      ],
      email: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
      ],
      verificationCode: [
        { required: true, message: "请输入验证码", trigger: "blur" },
      ],
      userType: [
        { required: true, message: "请选择用户类型", trigger: "change" },
      ],
    };

    const registerForm = ref(null);

    const createValidCode = (value) => {
      // form.verificationCode = value; // Debugging line to see the actual value
    };

    const handleRegister = () => {
      registerForm.value.validate((valid) => {
        if (valid) {
          request.post('/user/register', {
            userName: form.userName,
            password: form.password,
            email: form.email, // 假设注册表单中包含邮箱字段
            userType: form.userType, // 将用户类型一同发送
          }).then(response => {
            // console.log('Response:', response); // Debugging line to see the actual response
            // console.log(typeof response.data);

            // 检查 response 和 response.data 是否存在并且是对象
            if (response && typeof response.data === 'object') {
              const responseData = response.data;

              // 如果有 message 字段，则显示成功消息
              if (responseData.message) {
                ElMessage.success("注册成功！");
                router.push('/login'); // 注册成功后跳转到登录页面
              } else {
                // 如果没有 message 字段，可能需要检查其他字段或直接显示默认成功消息
                ElMessage.success("注册成功！");
                router.push('/login');
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
      registerForm,
      handleRegister,
      createValidCode,
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
  width: 250px;
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

.register-button-group {
  max-width: 500px;
  width: 100%;
  display: flex;
}

.admin-checkbox {
  margin-left: 20px; /* 根据需要调整间距 */
  flex-shrink: 0; /* 使 checkbox 元素在 flex 布局中不占据空间 */
}


</style>
