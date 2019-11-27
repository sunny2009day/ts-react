import axios from './index';
import { TypeAnyObject } from '../typings/common';
export function validate() {
  // promise resolved出来的就是服务器返回的对象 
  /**
   * {
    code: 0,
    data: result
  }
   */
  return axios.get('/api/validate');
}
export function register(values: TypeAnyObject) {
  return axios.post('/api/register', values);
}
export function login(values: TypeAnyObject) {
  return axios.post('/api/login', values);
}
export function logout() {
  return axios.post('/api/logout');
}