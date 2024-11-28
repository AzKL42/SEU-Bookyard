<!-- 登录注册界面 -->

<template>
  <div class="login-register">
    <div class="container" :class="{ 'active': !isLogin }">
      <div class="form-box login">
        <Login />
      </div>
      <div class="form-box register">
        <Register />
      </div>
      <div class="toggle-box">
        <div class="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>还没有账户?</p>
          <el-button type="primary" @click="toggleToRegister" class="btn register-btn">注册</el-button>
        </div>
        <div class="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>已有账户?</p>
          <el-button type="primary" @click="toggleToLogin" class="btn login-btn">登录</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';

const isLogin = ref(true);

const toggleToRegister = () => {
  isLogin.value = false;
};

const toggleToLogin = () => {
  isLogin.value = true;
};

</script>

<style scoped>

.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.container {
  position: relative;
  width: 850px;
  height: 550px;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 0px 30px rgba(0, 0, 0, 0.2);
  margin: 20px;
  overflow: hidden;
}

.form-box {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    color: #333;
    text-align: center;
    padding: 40px;
    z-index: 1;
    transition: .6s ease-in-out 1.2s, visibility 0s 1s;
}

.container.active .form-box {
    right: 50%;
}

.form-box.register {
    visibility: hidden;
}

.container.active .form-box.register {
    visibility: visible;
}

.container h1 {
    font-size: 36px;
    margin: 10px 0;
}

.container p {
    font-size: 14.5px;
    margin: 15px 0;
}

.toggle-box {
  position: absolute;
  width: 100%;
  height: 100%;
}

.toggle-box::before {
  content: '';
  position: absolute;
  left: -250%;
  width: 300%;
  height: 100%;
  background: #7494ec;
  border-radius: 150px;
  z-index: 2;
  transition: 1.8s ease-in-out;
}

.container.active .toggle-box::before {
    left: 50%;
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 2;
  transition: 0.6s ease-in-out;
}

.toggle-panel.toggle-left {
  left: 0;
  transition-delay: 1.2s;
}

.container.active .toggle-panel.toggle-left {
  left: -50%;
  transition-delay: 0.6s;
}

.toggle-panel.toggle-right {
  right: -50%;
  transition-delay: 0.6s;
}

.container.active .toggle-panel.toggle-right {
  right: 0;
  transition-delay: 1.2s;
}

.toggle-panel p {
  margin-bottom: 20px;
}

.toggle-panel .btn {
  width: 160px;
  height: 46px;
  /* background: transparent; */
  background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);
  border: 2px solid #fff;
  box-shadow: none;
  border-radius: 30px;
  background-size: 400%;
  z-index: 1;
}

.toggle-panel .btn:hover {
  animation: animate 8s linear infinite;
}

@keyframes animate {
  from {
    background-position: 0;
  }
  to {
    background-position: 400%;
  }
}

</style>