import Vue from 'vue'
import Router from 'vue-router'
import main from '@/view/main'
import account from '@/view/account'
import services from '@/view/services'
import microstation from '@/view/microstation'
import generalize from '@/view/generalize'
import manage from '@/view/manage'
import report from '@/view/report'
import help from '@/view/help'
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
    {
      path:'/star/services',
      name: 'services',
      component: services
    },
    {
      path:'/star/generalize',
      name: 'generalize',
      component: generalize
    },
    {
      path:'/star/microstation',
      name: 'microstation',
      component: microstation
    },
    {
      path:'/star/manage',
      name: 'manage',
      component: manage
    },
    {
      path:'/star/report',
      name: 'report',
      component: report
    },
    {
      path:'/help',
      name: 'help',
      component: help
    }
  ]
})
