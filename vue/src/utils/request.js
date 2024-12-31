/**
 * @author ApplePie
 * @date 2024-11-30
 * @description 请求封装
 */

import axios from 'axios'
import router from "../router";

const request = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    config.headers['Accept'] = 'application/json';

    // 可以在这里设置请求头，例如 token
    // config.headers['token'] = user.token;

    // 取出 sessionStorage 里面缓存的用户信息
    // const userInfo = sessionStorage.getItem('userInfo');
    // if (userInfo) {
    //     config.headers['Authorization'] = `Bearer ${userInfo.token}`;
    // }

    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
      let res = response.data;
      
      // 如果是返回的文件，直接返回原始数据
      if (response.config.responseType === 'blob') {
        return response;
      }
  
      // 尝试将字符串响应解析为 JSON 对象
      if (typeof res === 'string') {
        try {
          res = JSON.parse(res);
        } catch (e) {
          console.error('Failed to parse JSON:', e);
          return Promise.reject(new Error('Invalid JSON response'));
        }
      }
  
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


export default request

