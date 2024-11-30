<!--
  @author: <Applepie>
  @date: 2024/11/30
  @description: 密码重置页面（登录界面处的密码重置）
-->

<template>
  <div class="login-container">
    <div class="overlay">
      <el-form ref="form" :model="form" :rules="rules" class="login-page">
        <h2 class="title">密码重置</h2>

        <!-- 用户名 -->
        <el-form-item prop="username" class="login-input-box">
          <el-input v-model="form.username" placeholder="请输入您的用户名" clearable>
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item prop="password" class="login-input-box">
          <el-input v-model="form.password" placeholder="请输入新密码" clearable show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item prop="confirm" class="login-input-box">
          <el-input v-model="form.confirm" placeholder="请再次确认密码" clearable show-password>
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item class="login-input-box code-input-box">
          <div class="code-container">
            <el-input v-model="form.code" placeholder="请输入验证码" clearable >
              <template #prefix>
                <el-icon><ChatDotSquare /></el-icon>
              </template>
            </el-input>
            <el-button type="success" plain @click="getcode" :disabled="isDisabled">
              {{ buttonName }}
            </el-button>
          </div>
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item class="login-input-box">
          <el-button type="primary" class="btn-reset" @click="register">重置密码</el-button>
        </el-form-item>

        <!-- 返回登录 -->
        <el-form-item>
          <el-button type="text" class="back-login" @click="$router.push('/login')">前往登录 >></el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入 Element Plus 图标库
import { User, Lock, ChatDotSquare } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import request from "../utils/request";

export default {
  name: "Forget",
  components: { User, Lock, ChatDotSquare },
  data() {
    return {
      buttonName: "获取短信验证码",
      isDisabled: false,
      time: 60,
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 13, message: "长度要求为2到13位", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        confirm: [{ required: true, message: "请确认密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    getcode() {
      if (!this.form.username) {
        ElMessage.error("请填写用户名");
        return;
      }
      if (!this.form.password) {
        ElMessage.error("请填写新密码");
        return;
      }
      if (this.form.password != this.form.confirm) {
        ElMessage.error("两次密码输入不一致");
        return;
      }
      request
        .get("forget/getcode", {
          params: { username: this.form.username },
        })
        .then((res) => {
          if (res.code == 0) {
            ElMessage.success("验证码发送成功");
            let me = this;
            me.isDisabled = true;
            let interval = window.setInterval(function () {
              me.buttonName = `（${me.time}秒）后重新发送`;
              --me.time;
              if (me.time < 0) {
                me.buttonName = "重新发送";
                me.time = 60;
                me.isDisabled = false;
                window.clearInterval(interval);
              }
            }, 1000);
          } else {
            ElMessage.error(res.msg);
          }
        });
    },
    register() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (!this.form.code) {
            ElMessage.error("请填写验证码");
            return;
          }
          if (!this.form.password) {
            ElMessage.error("请填写新密码");
            return;
          }
          if (this.form.password != this.form.confirm) {
            ElMessage.error("两次密码输入不一致");
            return;
          }
          request.post("forget/register", this.form).then((res) => {
            if (res.code == 0) {
              ElMessage.success("密码修改成功");
              this.$router.push("/login");
            } else {
              ElMessage.error(res.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
/* 背景设计 */
.login-container {
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #74b9ff, #81ecec);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 400px;
}

/* 登录框样式 */
.login-page {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #2d3436;
  text-align: center;
  margin-bottom: 20px;
}

/* 输入框样式 */
.login-input-box {
  margin-bottom: 20px;
}

.el-input {
  width: 100%;
}

.code-container {
  display: flex;
  gap: 35px; /* 输入框和按钮的间距 */
}

.code-container .el-input {
  flex: 4; /* 输入框占 4 比例 */
}

.code-container .el-button {
  flex: 1; /* 按钮占 1 比例 */
  white-space: nowrap; /* 防止按钮文字换行 */
}

.btn-reset {
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  color: white;
  border: none;
  transition: 0.3s ease;
}

.btn-reset:hover {
  background: linear-gradient(135deg, #0984e3, #74b9ff);
}

.back-login {
  font-size: 14px;
  color: #0984e3;
}
</style>
