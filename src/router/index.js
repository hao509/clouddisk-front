import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/home'
import Test from '@/components/test'
import Test11 from '@/components/test1/test11'
import Test12 from '@/components/test1/test12'
import Test21 from '@/components/test2/test21'
import Test22 from '@/components/test2/test22'
import MenuList from '@/components/menulist'
import Register from '@/components/register'
import Admin from '@/components/views/admin/admin'
import Systemmanage from '@/components/views/admin/systemmanage'
import Usermanage from '@/components/views/admin/usermanage'
import First from '@/components/views/user/first'
import Message from '@/components/views/user/message'
import Usercenter from '@/components/views/user/usercenter'
import Work from '@/components/views/user/work'

import {
  name
} from 'file-loader'

Vue.use(Router)

export default new Router({
  mode: "history", //去掉url地址栏#号 开发的时候使用
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },


    {
      path: '/home',
      name: 'home',
      component: Home,

      //默认子页面
      children: [{
          path: '/first',
          name: 'first',
          component: First,
          menu: true,
          meta: {
            title: "首页",
            icon: "el-icon-s-home",
            role: ['user']
          }
        },





        {
          path: '/usercenter',
          name: 'usercenter',
          component: Usercenter,
          menu: true,
          meta: {
            title: "个人中心",
            icon: "el-icon-success",
            role: ['user']

          }
        },

        {
          path: '/work',
          name: 'work',
          component: Work,
          menu: true,
          meta: {
            title: "事务",
            icon: "el-icon-success",
            role: ['user']

          }
        },
        {
          path: '/message',
          name: 'message',
          component: Message,
          menu: true,
          meta: {
            title: "消息",
            icon: "el-icon-message",
            role: ['user']
          }
        },
        {
          path: '/admin',
          name: 'admin',
          component: Admin,
          menu: true,
          meta: {
            title: "管理员管理",
            icon: "el-icon-success",
            role: ['admin']
          },
          children: [{
            path: 'test',
            name: 'test',
            menu: true,
            component:Test,
            meta:{
              title: "test",
              role:['admin']

            }
          }]
        },
        {
          path: '/systemmanage',
          name: 'systemmanage',
          component: Systemmanage,
          menu: true,
          meta: {
            title: "系统管理",
            icon: "el-icon-success",
            role: ['admin']

          }

        },
        {
          path: '/usermanage',
          name: 'usermanage',
          component: Usermanage,
          menu: true,
          meta: {
            title: "用户管理",
            icon: "el-icon-success",
            role: ['admin']

          }
        }




      ]
    },


    // {
    //   path: "*",
    //   redirect: "/login"
    // }

  ]
})
