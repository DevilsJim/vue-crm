import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { getRole } from '../utils/auth'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  /* 线索管理 */
  {
    path: '/cluesManagement',
    component: Layout,
    redirect: '/cluesManagement/myClues',
    name: 'CluesManagement',
    meta: { title: '线索管理', icon: 'clues' },
    children: [
      {
        path: 'CommonClues',
        name: 'commonClues',
        component: () => import('@/views/cluesManagement/commonClues/index'), // Parent router-view
        meta: { title: '公共线索', icon: 'common-clues' }
      },
      {
        path: 'myClues',
        name: 'myClues',
        component: () => import('@/views/cluesManagement/myClues/index'), // Parent router-view
        meta: { title: '我的线索', icon: 'my-clues' }
      },
      {
        path: 'cluesDetail/:currentThreadId',
        name: 'CluesDetail',
        hidden: true,
        component: () => import('@/views/cluesManagement/myClues/cluesDetail'), // Parent router-view
        meta: { title: '我的线索详情', icon: 'my-customer' }
      },
      {
        path: 'commonCluesDetail/:currentThreadId/:currentCompanyId',
        name: 'CommonCluesDetail',
        hidden: true,
        component: () => import('@/views/cluesManagement/commonClues/cluesDetail'), // Parent router-view
        meta: { title: '公共线索详情', icon: 'my-customer' }
      }
    ]
  },

  /* 客户管理 */
  {
    path: '/customerManagement',
    component: Layout,
    redirect: '/customerManagement/myCustomer',
    name: 'CustomerManagement',
    meta: { title: '客户管理', icon: 'menu' },
    children: [
      {
        path: 'myCustomer',
        name: 'MyCustomer',
        component: () => import('@/views/customerManagement/myCustomer/index'), // Parent router-view
        meta: { title: '我的客户', icon: 'my-customer' }
      },
      {
        path: 'customerDetail/:currentCompanyId',
        name: 'CustomerDetail',
        hidden: true,
        component: () => import('@/views/customerManagement/myCustomer/customerDetail'), // Parent router-view
        meta: { title: '客户详情', icon: 'my-customer' }
      },
      {
        path: 'resourceLibrary',
        name: 'ResourceLibrary',
        component: () => import('@/views/customerManagement/resourceLibrary/index'),
        meta: { title: '公海', icon: 'resource' }
      },
      {
        path: 'resourceCustomerDetail/:currentCompanyId',
        name: 'ResourceCustomerDetail',
        hidden: true,
        component: () => import('@/views/customerManagement/resourceLibrary/resourceCustomerDetail'),
        meta: { title: '公海-客户详情', icon: 'resource' }
      }
    ]
  },

  /* 订单列表 */
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    meta: { title: '订单管理', icon: 'menu' },
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('views/order/index'),
        meta: { title: '订单列表', icon: 'resource' }
      },
      {
        path: 'detail',
        name: 'OrderDetail',
        hidden: true,
        component: () => import('views/order/detail/index'),
        meta: { title: '订单详情', icon: 'resource' }
      }
    ]
  },

  // 发票列表
  {
    path: '/invoice',
    component: Layout,
    name: 'Invoice',
    meta: { title: '发票列表', icon: 'menu' },
    children: [
      {
        path: 'list',
        name: 'InvoiceList',
        component: () => import('views/invoice/index'),
        meta: { title: '发票列表', icon: 'resource' }
      },
      {
        path: 'Detail',
        name: 'InvoiceDetail',
        hidden: true,
        component: () => import('views/invoice/detail/index'),
        meta: { title: '发票详情', icon: 'resource' }
      }
    ]
  },

  /* 商机管理 */
  {
    path: '/businessManagement',
    component: Layout,
    redirect: '/businessManagement/myBusiness',
    name: 'BusinessManagement',
    meta: { title: '商机管理', icon: 'menu' },
    children: [
      {
        path: 'myBusiness',
        name: 'MyBusiness',
        component: () => import('@/views/businessManagement/myBusiness/index'),
        meta: { title: '我的商机', icon: 'my-customer' }
      },
      {
        path: 'businessDetail/:currentBusinessId',
        name: 'BusinessDetail',
        hidden: true,
        component: () => import('@/views/businessManagement/businessDetail/businessDetail'),
        meta: { title: '商机详情', icon: 'my-customer' }
      },
      {
        path: 'transferRecords',
        name: 'TransferRecords',
        component: () => import('@/views/businessManagement/transferRecords/index'),
        meta: { title: '转移记录', icon: 'my-customer' }
      }
    ]
  },

  /* 团队管理 */
  {
    path: '/TeamManagement',
    component: Layout,
    redirect: '/TeamManagement/customerList',
    name: 'TeamManagement',
    // hidden: true,
    meta: { title: '团队管理', icon: 'menu' },
    children: [
      {
        path: 'customerList',
        name: 'CustomerList',
        component: () => import('@/views/TeamManagement/customerList/index'),
        meta: { title: '客户清单', icon: 'my-customer' }
      },
      {
        path: 'customerDetail/:currentCompanyId',
        name: 'TeamCustomerDetail',
        hidden: true,
        component: () => import('@/views/TeamManagement/customerList/customerDetail'), // Parent router-view
        meta: { title: '客户详情' }
      },
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/TeamManagement/orderList/index'),
        meta: { title: '订单列表', icon: 'my-customer' }
      }
      // {
      //   path: 'orderDetail/:currentCompanyId',
      //   name: 'OrderDetail',
      //   hidden: true,
      //   component: () => import('@/views/TeamManagement/orderList/orderDetail'),
      //   meta: { title: '订单详情' }
      // }
    ]
  },

  /* 付款信息 */
  {
    path: '/PaymentInfoMenu',
    component: Layout,
    redirect: '/paymentInfo',
    name: 'PaymentInfoMenu',
    meta: { title: '付款信息', icon: 'menu' },
    children: [
      {
        path: 'paymentInfo',
        name: 'PaymentInfo',
        component: () => import('@/views/paymentInfo/index'), // Parent router-view
        meta: { title: '付款信息', icon: 'my-customer' }
      },
      {
        path: 'paymentInfoDetail/:payId',
        name: 'PaymentInfoDetail',
        hidden: true,
        component: () => import('@/views/paymentInfo/paymentInfoDetail'), // Parent router-view
        meta: { title: '付款信息详情', icon: 'my-customer' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// 临时判断  用于对顾问隐藏团队管理
const roleIdMap = ['2', '72']
const userRole = getRole()
if (userRole) {
  if (userRole.split(',').filter(v => roleIdMap.includes(v)).length > 0) {
    // constantRoutes[4].hidden = true
  }
}

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
