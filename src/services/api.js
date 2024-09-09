import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// 요청 인터셉터 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  getAllPosts() {
    return api.get('/post').then((response) => response.data);
  },

  getPostById(id) {
    return api.get(`/post/${id}`).then((response) => response.data);
  },

  createPost(formData) {
    return api.post('/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => response.data);
  },

  updatePost(id, post) {
    return api.put(`/post/${id}`, post).then((response) => response.data);
  },

  deletePost(id) {
    return api.delete(`/post/${id}`);
  },

  login(username, password) {
    return api.post('/auth/login', { username, password });
  },

  register(username, password) {
    return api.post('/auth/register', { username, password });
  },

  setAuthHeader(token) {
    localStorage.setItem('token', token);
  },

  removeAuthHeader() {
    localStorage.removeItem('token');
  }
};