import Vue from 'vue'
import VueRouter from 'vue-router'
const Home=()=>import('view/home/Home')
const Category=()=>import('../views/categories/Category')
const Shop=()=>import('../views/shopcar/Shop')
const Profile=()=>import('../views/mine/Profile')
const Detail=()=>import('../views/detail/Detail')
Vue.use(VueRouter)
const routes = [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/category',
      component: Category 
    },
    {
      path: '/shop',
      component: Shop
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    }    
  ]
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router