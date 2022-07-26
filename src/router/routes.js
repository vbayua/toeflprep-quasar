const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'profile', component: () => import('pages/ProfilePage.vue') },
      { path: 'exampagetest/:id', name: 'exampage', component: () => import('pages/ExamPage.vue') },
      { path: 'examlisttest', name: 'examlist', component: () => import('pages/ExamListPage.vue') },
      { path: 'board', component: () => import('pages/BoardUser.vue') }
    ]
  },

  {
    path: '/exam',
    component: () => import('layouts/ExamLayout.vue'),
    children: [
      { path: 'listening/:id', name: 'listeningpage', component: () => import('pages/ListeningPage.vue') },
      { path: 'structure/:id', name: 'structurepage', component: () => import('pages/StructurePage.vue') },
      { path: 'reading/:id', name: 'readingpage', component: () => import('pages/ReadingPage.vue') },
      { path: 'finished', name: 'finishpage', component: () => import('pages/FinishPage.vue') }
    ]
  },

  {
    path: '/results',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'results', component: () => import('pages/ExamResultsPage.vue') },
      { path: 'detail/:id', name: 'result', component: () => import('pages/ResultPage.vue') }
    ]
  },

  {
    path: '/printresult',
    component: () => import('layouts/PrintLayout.vue'),
    children: [
      { path: 'cert/:id', name: 'printresult', component: () => import('pages/PrintResult.vue') },
      { path: 'report/:id', name: 'printreport', component: () => import('pages/PrintReport.vue') }
    ]
  },

  {
    path: '/auth',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue')
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
      { path: 'exam-data/:id', name: 'datasoal', component: () => import('pages/DataSoalPage.vue') },
      { path: 'exam-data/:id/question', name: 'questionform', component: () => import('pages/AddQuestionPage.vue') },
      { path: 'exam-data/:id/question/:qid', name: 'editquestionform', component: () => import('pages/UpdateDataSoal.vue') },
      { path: 'results-data', name: 'adminresults', component: () => import('pages/AdminResults.vue') },
      { path: 'results-data/:id/users', name: 'resultlist', component: () => import('pages/UserResults.vue') },
      { path: 'results-data/:id/users/:uid', name: 'userresultdetail', component: () => import('pages/UserResult.vue') },
      { path: 'user-data', name: 'users', component: () => import('pages/MhsDataPage.vue') },
      {
        path: 'register',
        name: 'addUser',
        component: () => import('pages/RegisterPage.vue')
      }
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
