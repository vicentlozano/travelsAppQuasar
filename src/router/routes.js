const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomeView.vue'),
  },
  {
    path: '/chat',
    name: 'chat',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/ChatView.vue'),
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
    path: '/travels',
    name: 'travels',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/TravelsView.vue'),
  },
  {
    path: '/edit/:id',
    name: 'edit',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/EditView.vue'),
    props:true,
  },
  {
    path: '/add',
    name: 'add',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../pages/AddView.vue'),
  },
]

export default routes
