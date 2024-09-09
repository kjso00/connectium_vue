<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="name" required>
      </div>
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input id="phoneNumber" v-model="phoneNumber" required>
      </div>
      <div>
        <label for="username">Username (ID):</label>
        <input id="username" v-model="username" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required>
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
  name: 'UserRegister',
  setup() {
    const router = useRouter();
    const name = ref('');
    const phoneNumber = ref('');
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const register = async () => {
      try {
        await api.register(name.value, phoneNumber.value, username.value, email.value, password.value);
        router.push('/login');
      } catch (error) {
        console.error('Registration error:', error);
      }
    };

    return {
      name,
      phoneNumber,
      username,
      email,
      password,
      register
    };
  }
};
</script>