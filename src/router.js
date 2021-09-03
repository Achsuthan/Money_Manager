import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Group',
          path: '/group',
          component: () => import('@/views/dashboard/pages/Group/Group'),
        },
        {
          name: 'Group Info',
          path: '/group_info',
          component: () => import('@/views/dashboard/pages/Group/GroupInfo'),
        },
        {
          name: 'Notifications',
          path: '/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Transactions',
          path: '/transactions',
          component: () => import('@/views/dashboard/pages/Transactions/ListingTransactions'),
        },
        {
          name: 'Invites',
          path: '/invites',
          component: () => import('@/views/dashboard/pages/Invites/Invites'),
        },
        {
          name: 'Friends',
          path: '/friends',
          component: () => import('@/views/dashboard/pages/Friends/Friends'),
        },
        {
          name: 'Search Friends',
          path: '/search_friends',
          component: () => import('@/views/dashboard/pages/Friends/SearchFriends'),
        },
        {
          name: 'Add Expenses',
          path: '/add_expenses',
          component: () => import('@/views/dashboard/pages/Expenses/AddExpenses'),
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('./views/dashboard/Login'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
})
