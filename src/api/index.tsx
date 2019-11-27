import axios from 'axios';
import qs from 'qs'; // querystring可以把一个对象转化成字符串
 

axios.defaults.baseURL = "http://localhost:9000"; // 接口的主机和端口号

axios.defaults.withCredentials = true; // 跨域携带cookies
axios.defaults.transformRequest = (data={})=>qs.stringify(data); // 转化对象的请求体为字符串

// 拦截请求的响应,data属性里面放的就是对象的响应体
axios.interceptors.response.use((result)=>{
  return result.data
},  error => {
  console.log(error);
});
export default axios;

