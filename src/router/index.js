import { createRouter, createWebHistory } from 'vue-router';
import PostCreate from '@/components/PostCreate.vue';
import PostEdit from '@/components/PostEdit.vue';
import PostView from '@/components/PostView.vue';
import PostList from '@/components/PostList.vue';
import UserLogin from '@/components/Login.vue';
import UserRegister from '@/components/Register.vue';
import OAuth2Redirect from '@/components/OAuth2Redirect.vue';
import kakaomap from '@/components/kakaomap.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PostList,
  },
  {
    path: '/post/create',
    name: 'PostCreate',
    component: PostCreate,
  },
  {
    path: '/post/:id',
    name: 'PostView',
    component: PostView,
  },
  {
    path: '/post/:id/edit',
    name: 'PostEdit',
    component: PostEdit,
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: UserLogin,
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister,
  },
  {
    path: '/oauth2/redirect',
    name: 'OAuth2Redirect',
    component: OAuth2Redirect,
  },
  { 
    path: "/map",
    name: "kakaomap",
    component:kakaomap,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/oauth2/redirect'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
