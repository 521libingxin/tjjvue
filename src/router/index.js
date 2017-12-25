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
import datalist from '@/view/datalist'
import answer from '@/view/answer'
import safe from '@/view/safe'
import news from '@/view/news'
import test from '@/components/test'
import a from '@/view/a'
import b from '@/view/b'
import c from '@/view/c'
import login from '@/view/login'
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
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/services',
      name: 'services',
      component: services
    },

    {
      path:'/help',
      name: 'help',
      component: help
    },
    {
      path:'/datalist',
      name: 'datalist',
      component: datalist
    },
    {
      path:'/answer',
      name: 'answer',
      component: answer
    },
    {
      path:'/safe',
      name: 'safe',
      component:safe
    },
    {
      path:'/news',
      name: 'news',
      component:news
    },
    {
      path:'*',
      redirect:'/main'
    }
  ]
})
