const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'board', component: () => import('pages/BoardUser.vue') }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue')
      }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdminPage.vue') },
      { path: 'home', component: () => import('pages/AdminPage.vue') },
      { path: 'exam-data', component: () => import('pages/ExamDataPage.vue') },
      { path: 'exam-data/add', component: () => import('pages/AddExamDataPage.vue') },
      { path: 'results-data', component: () => import('pages/ExamResultsPage.vue') },
      { path: 'students-data', component: () => import('pages/MhsDataPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
