import axios from './index';
 
export function getSliders() {
  return axios.get('/api/getSliders');
}

export function getLessons(currentCategory: string, offset: number =0, limit: number = 5) {
  return axios.get(`/api/getLessons?category=${currentCategory}&offset=${offset}&limit=${limit}`);
 // 换行会产生空格
}