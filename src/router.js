import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
        // {
        //   name: 'Group_1',
        //   path: '',
        //   component: () => import('@/views/dashboard/pages/Group/Group'),
        //   meta:{
        //     isAuth: true,
        //   }
        // },
        {
          name: 'Profile',
          path: '/profile',
          component: () => import('@/views/dashboard/pages/Profile/Profile'),
          meta: {
            isAuth: true,
          }
        },
        {
          name: 'Group',
          path: '/',
          component: () => import('@/views/dashboard/pages/Group/Group'),
          meta: {
            isAuth: true,
          }
        },

        {
          name: 'Create Group',
          path: '/create-group',
          component: () => import('@/views/dashboard/pages/Group/CreateGroup'),
          meta: {
            isAuth: true,
          }
        },
        {
          name: 'Group Info',
          path: '/group/:id',
          component: () => import('@/views/dashboard/pages/Group/GroupInfo'),
          meta: {
            isAuth: true,
          }
        },
        {
          name: 'Transactions',
          path: '/transactions',
          component: () => import('@/views/dashboard/pages/Transactions/ListingTransactions'),
          meta: {
            isAuth: true,
          }
        },
        {
          name: 'Add Friend Transactions',
          path: '/add_transaction/friend/',
          component: () => import('@/views/dashboard/pages/AddTransaction/AddTransaction'),
          meta: {
            isAuth: true,
            title: 'Add Friend Transactions',
            type: "friend"
          }
        },
        {
          name: 'Own Transactions',
          path: '/add_transaction/own',
          component: () => import('@/views/dashboard/pages/AddTransaction/AddTransaction'),
          meta: {
            isAuth: true,
            title: 'Add Own Transactions',
            type: "personal"
          }
        },
        {
          name: 'Group Transactions',
          path: '/add_transaction/group/:groupId',
          component: () => import('@/views/dashboard/pages/AddTransaction/AddTransaction'),
          meta: {
            isAuth: true,
            title: 'Add Group Transactions',
            type: "group"
          }
        },
        {
          name: 'Invites',
          path: '/invites',
          component: () => import('@/views/dashboard/pages/Invites/Invites'),
          meta: {
            isAuth: true,
          }
        },
        {
          name: 'Friends',
          path: '/friends',
          component: () => import('@/views/dashboard/pages/Friends/Friends'),
          meta: {
            isAuth: true,
          }
        },
        {
          name: 'Search Friends',
          path: '/search-friends',
          component: () => import('@/views/dashboard/pages/Friends/SearchFriends'),
          meta: {
            isAuth: true,
            isGroup: false
          }
        },
        {
          name: 'Search Friends',
          path: '/search-friends-group/:id',
          component: () => import('@/views/dashboard/pages/Friends/SearchFriends'),
          meta: {
            isAuth: true,
            isGroup: true
          }
        },
        {
          name: 'Add Transaction',
          path: '/add_expenses',
          component: () => import('@/views/dashboard/pages/AddTransaction/AddTransaction'),
          meta: {
            isAuth: true,
          }
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('./views/dashboard/Login'),
      meta: {
        isAuth: false,
      }
    },
    {
      path: '*',
      redirect: '/group',
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.isAuth) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      next("/login");
      return
    }
  }
  next()
})


export default router;