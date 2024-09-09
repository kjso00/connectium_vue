<template>
    <div>처리 중...</div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'OAuth2Redirect',
    setup() {
      const router = useRouter();
  
      onMounted(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
          localStorage.setItem('token', token);
          // API 설정에 토큰 추가 (api.js 파일에 setAuthHeader 함수가 있다고 가정)
          // api.setAuthHeader(token);
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