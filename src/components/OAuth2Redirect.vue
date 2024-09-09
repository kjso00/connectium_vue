<template>
  <div>처리 중...</div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default {
  name: 'OAuth2Redirect',
  setup() {
    const router = useRouter();

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        localStorage.setItem('token', token);
        api.setAuthHeader(token);
        router.push('/');
      } else {
        console.error('No token found in URL');
        router.push('/login');
      }
    });

    return {};
  }
}
</script>