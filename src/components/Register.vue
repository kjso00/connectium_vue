<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="password" type="password" required>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '@/services/api';
  
  export default {
    name: 'UserRegister', // Changed from 'Register' to 'UserRegister'
    setup() {
      const router = useRouter();
      const username = ref('');
      const password = ref('');
  
      const register = async () => {
        try {
          await api.register(username.value, password.value);
          router.push('/login');
        } catch (error) {
          console.error('Registration error:', error);
        }
      };
  
      return {
        username,
        password,
        register
      };
    }
  };
  </script>