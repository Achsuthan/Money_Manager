import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        // {
        //   name: 'Dashboard',
        //   path: '',
        //   component: () => import('@/views/dashboard/Dashboard'),
        //   meta:{
        //     isAuth: true,
        //   }
        // },
        // Pages
        {
          name: 'Group_1',
          path: '',
          component: () => import('@/views/dashboard/pages/Group/Group'),
          meta:{
            isAuth: true,
          }
        },
        {
          name: 'Group',
          path: '/group',
          component: () => import('@/views/dashboard/pages/Group/Group'),
          meta:{
            isAuth: true,
          }
        },

        {
          name: 'Create Group',
          path: '/create-group',
          component: () => import('@/views/dashboard/pages/Group/CreateGroup'),
          meta:{
            isAuth: true,
          }
        },
        {
          name: 'Group Info',
          path: '/group/:id',
          component: () => import('@/views/dashboard/pages/Group/GroupInfo'),
          meta:{
            isAuth: true,
          }
        },
        {
          name: 'Transactions',
          path: '/transactions',
          component: () => import('@/views/dashboard/pages/Transactions/ListingTransactions'),
          meta:{
            isAuth: true,
          }
        },
        {
          name: 'Invites',
          path: '/invites',
          component: () => import('@/views/dashboard/pages/Invites/Invites'),
          meta:{
            isAuth: true,
          }
        },
        {
          name: 'Friends',
          path: '/friends',
          component: () => import('@/views/dashboard/pages/Friends/Friends'),
          meta:{
            isAuth: true,
          }
        },
        {
          name: 'Search Friends',
          path: '/search_friends',
          component: () => import('@/views/dashboard/pages/Friends/SearchFriends'),
          meta:{
            isAuth: true,
            isGroup: false
          }
        },
        {
          name: 'Search Friends',
          path: '/search_friends_group/:id',
          component: () => import('@/views/dashboard/pages/Friends/SearchFriends'),
          meta:{
            isAuth: true,
            isGroup: true
          }
        },
        {
          name: 'Add Expenses',
          path: '/add_expenses',
          component: () => import('@/views/dashboard/pages/Expenses/AddExpenses'),
          meta:{
            isAuth: true,
          }
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('./views/dashboard/Login'),
      meta:{
        isAuth: false,
      }
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to,from,next) => {
  if(to.meta.isAuth){
    let user = JSON.parse(localStorage.getItem("user"));
    if(!user){
      next("/login");
      return
    }
  }
  next()
})


export default router;