const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../pages/RegisterView.vue'),
  },
  {
    path: '/chat:contactId?',
    name: 'chat',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/ChatView.vue'),
    props: true,
  },
  {
    path: '/media',
    name: 'media',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/MediaView.vue'),
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/SearchView.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/ProfileView.vue'),
  },
  {
    path: '/edit/:id',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/EditView.vue'),
    props: true,
  },
  {
    path: '/add',
    name: 'add',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/AddView.vue'),
  },
  {
    path: '/verifyEmail',
    name: 'verify',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/VerifyView.vue'),
  },
]

export default routes
