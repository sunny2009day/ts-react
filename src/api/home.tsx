import axios from './index';
 
export function getSliders() {
  return axios.post('/api/getSliders');
}

export function getLessons(currentCategory: string, offset: number =0, limit: number = 5) {
  return axios.post(`/api/getLessons?category=${currentCategory}
  &offset=${offset}&limit=${limit}`);
}