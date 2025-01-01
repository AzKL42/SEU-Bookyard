/**
 * @author ApplePie
 * @date 2024-12-31
 * @description 请求封装
 */

import axios from 'axios';

const uploadRequest = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
});

// uploadRequest 拦截器
// 可以自请求发送前对请求做一些处理
uploadRequest.interceptors.request.use(config => {
    // 可以在这里设置其他公共头部信息，例如 token
    return config;
}, error => {
    return Promise.reject(error);
});

// response 拦截器
// 可以在接口响应后统一处理结果
uploadRequest.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log('err' + error); // for debug
      const { response } = error;
      if (response) {
        switch (response.status) {
          case 400:
            console.log('客户端请求错误');
            break;
          case 401:
            console.log('未授权，请重新登录');
            sessionStorage.removeItem('userInfo');
            router.push('/login');
            break;
          case 403:
            console.log('禁止访问');
            break;
          case 404:
            console.log('请求资源不存在');
            break;
          case 500:
            console.log('服务器内部错误');
            break;
          default:
            console.log(`未知错误：${response.status}`);
        }
      } else {
        console.log('网络连接错误');
      }
      return Promise.reject(error);
    }
);


export default uploadRequest