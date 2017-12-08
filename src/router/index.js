import Vue from 'vue'
import Router from 'vue-router'
import main from '@/view/main'
import account from '@/view/account'
import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
  ]
})
