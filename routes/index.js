// We only need to import the modules necessary for initial render
import WheatLayout from 'layouts/WheatLayout'
import GoLayout from 'layouts/GoLayout'
import PageLayout from 'layouts/PageLayout'
import DashBordRoute from './DashBord'
import LoginRoute from './Login'
import ApplyRoute from './Apply'
import NotFoundRoute from './NotFound'
import PrintUserRoute from './Print'
import PrintAdminRoute from './Print/admin'
import PrintModifyRoute from './Print/modify'
import AdminMenusRoute from './Admin/Menus'
import AdminShopsRoute from './Admin/Shops'
import AdminUsersRoute from './Admin/Users'
import AdminBrandsRoute from './Admin/Brands'
import AdminCompanyRoute from './Admin/Company'
import AdminAccessRoute from './Admin/Access'
import PurchaseListRoute from './Purchase/List'
import CompanyClientsRoute from './Company/Clients'
import AdminWarehousesRoute from './Admin/Warehouses'
//import AdminCompanyRoute from './Admin/Company'
// const QQ = require.context('./__ENTERIES__', false, /\.js$/)
// console.dir(QQ)
// console.log(QQ.keys())
// console.log(QQ('./AdminBrandsRoute.js'))

export const createRoutes = (store) => ([
  {
    path: '/go',
    component: GoLayout,
    childRoutes: [
      LoginRoute(store),
      ApplyRoute(store),
      NotFoundRoute
    ],
    ignoreScrollBehavior: true,
    indexRoute: NotFoundRoute
  },
  {
    path: '/page',
    component: PageLayout,
    childRoutes: [
      PrintModifyRoute(store),
      NotFoundRoute
    ],
    ignoreScrollBehavior: true,
    indexRoute: NotFoundRoute
  },
  {
    path: '/print',
    component: WheatLayout,
    childRoutes: [
      PrintUserRoute(store),
      PrintAdminRoute(store)
    ],
    ignoreScrollBehavior: true,
    indexRoute: NotFoundRoute
  },
  {
    path: '/',
    component: WheatLayout,
    indexRoute: DashBordRoute(store),
    childRoutes: [
      AdminShopsRoute(store),
      AdminCompanyRoute(store),
      AdminMenusRoute(store),
      AdminUsersRoute(store),
      AdminBrandsRoute(store),
      AdminAccessRoute(store),
      PurchaseListRoute(store),
      CompanyClientsRoute(store),
      AdminWarehousesRoute(store),
      NotFoundRoute
    ],
    ignoreScrollBehavior: true
  }
])
export default createRoutes
