<template>
  <div>
    <h2>새 게시글 작성</h2>
    <form @submit.prevent="createPost">
      <div>
        <label for="title">제목:</label>
        <input id="title" v-model="post.title" required>
      </div>
      <div>
        <label for="author">글쓴이:</label>
        <input id="author" v-model="post.author" required>
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea id="content" v-model="post.content" required></textarea>
      </div>
      <div>
        <label for="image">이미지:</label>
        <input type="file" id="image" @change="handleFileUpload" accept="image/*">
      </div>
      <button type="submit">게시글 작성</button>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default {
  name: 'PostCreate',
  setup() {
    const router = useRouter();
    const post = reactive({
      title: '',
      author: '',
      content: ''
    });
    const imageFile = ref(null);

    const handleFileUpload = (event) => {
      imageFile.value = event.target.files[0];
    };

    const createPost = async () => {
      try {
        const formData = new FormData();
        formData.append('title', post.title);
        formData.append('author', post.author);
        formData.append('content', post.content);
        if (imageFile.value) {
          formData.append('image', imageFile.value);
        }

        await api.createPost(formData);
        router.push('/');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    };

    return {
      post,
      createPost,
      handleFileUpload
    };
  }
};
</script>