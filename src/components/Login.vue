<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <button @click="loginWithGoogle">Login with Google</button>
        <button @click="loginWithNaver">Login with Naver</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '@/services/api';
  
  export default {
    name: 'UserLogin',
    setup() {
      const router = useRouter();
      const username = ref('');
      const password = ref('');
  
      const login = async () => {
        try {
          const response = await api.post('/api/auth/login', {
            username: username.value,
            password: password.value
          });
          localStorage.setItem('token', response.data.token);
          api.setAuthHeader(response.data.token);
          router.push('/');
        } catch (error) {
          console.error('Login error:', error);
        }
      };
  
      const loginWithGoogle = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
      };
  
      const loginWithNaver = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
      };
  
      return {
        username,
        password,
        login,
        loginWithGoogle,
        loginWithNaver
      };
    }
  };
  </script>