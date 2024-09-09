<template>
  <div id="app">
    <nav>
      <router-link to="/">홈</router-link> |
      <router-link to="/post/create">새 게시글 작성</router-link>
      <template v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </template>
      <a href="#" v-else @click.prevent="logout">Logout</a>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default {
  name: 'App',
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);

    const checkLoginStatus = () => {
      isLoggedIn.value = !!localStorage.getItem('token');
    };

    const logout = () => {
      localStorage.removeItem('token');
      api.removeAuthHeader();
      isLoggedIn.value = false;
      router.push('/login');
    };

    onMounted(() => {
      checkLoginStatus();
    });

    watch(() => router.currentRoute.value, () => {
      checkLoginStatus();
    });

    return {
      isLoggedIn,
      logout
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>