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
      path: '/main',
      name: 'main',
      component: main,
      children:[
        {
          path:'account',
          component:account
        },
        {
          path:'test',
          component:test
        },
        {
          path:'help',
          component: help
        }
      ]
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
      path:'/star_services',
      name: 'services',
      component: services
    },
    {
      path:'/star_generalize',
      name: 'generalize',
      component: generalize
    },
    {
      path:'/star_microstation',
      name: 'microstation',
      component: microstation
    },
    {
      path:'/star_manage',
      name: 'manage',
      component: manage
    },
    {
      path:'/star_report',
      name: 'report',
      component: report
    },
    {
      path:'/help',
      name: 'help',
      component: help
    },
    {
      path:'*',
      redirect:'/main'//重定向
    }
  ]
})
