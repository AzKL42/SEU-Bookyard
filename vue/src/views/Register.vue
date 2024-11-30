<!--
  @author: <Applepie>
  @date: 2024/11/29
  @description: 注册页面
-->

<template>
  <el-form ref="registerForm" :model="form" :rules="rules" class="register-form">
    <h1>注册</h1>
    <!-- 用户名输入框 -->
    <el-form-item prop="username" class="register-input-box">
      <el-input v-model="form.username" placeholder="请输入用户名">
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

    <!-- 注册按钮 -->
    <el-form-item>
      <el-button type="primary" @click="handleRegister" class="btn">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
import { User, Message, Lock } from "@element-plus/icons-vue";
import ValidCode from "../components/Validate.vue";

export default {
  components: {
    ValidCode,
  },
  setup() {
    const form = reactive({
      username: "",
      email: "",
      password: "",
      verificationCode: "",
    });

    const rules = {
      username: [
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
    };

    const registerForm = ref(null);

    const createValidCode = (value) => {
      // form.verificationCode = value;
    };

    const handleRegister = () => {
      // registerForm.value.validate((valid) => {
      //   if (valid) {
      //     console.log("Registration successful!", form);
      //   } else {
      //     console.error("Validation failed");
      //   }
      // });
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
