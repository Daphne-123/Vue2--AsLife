import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载
const home = () => import('../components/home.vue')
const category = () => import('../components/category.vue')
const cart = () => import('../components/cart.vue')
const find = () => import('../components/find.vue')
const profile = () => import('../components/profile.vue')

const newsList = () => import('../components/HomeChildren/news/NewsList.vue')
const newsInfo = () => import('../components/HomeChildren/news/NewsInfo.vue')
const imageList = () => import('../components/HomeChildren/photo/ImageList.vue')
const imageInfo = () => import('../components/HomeChildren/photo/ImageInfo.vue')
const goodList = () => import('../components/HomeChildren/shop/GoodList.vue')
const goodInfo = () => import('../components/HomeChildren/shop/GoodInfo.vue')

const routes = [
  {path: '', redirect: '/home'},
  {path: '/home', name: 'home', component: home},
  {path: '/category', name: 'category', component: category},
  {path: '/cart', name: 'cart', component: cart},
  {path: '/find', name: 'find', component: find},
  {path: '/profile', name: 'profile', component: profile},
  {path: '/home/newsList', name:'newslist', component: newsList},
  {path: '/home/newsInfo/:id', name:'newsinfo', component: newsInfo},
  {path: '/home/imagelist', name:'imagelist', component: imageList},
  {path: '/home/imageinfo/:id', name:'imageinfo', component: imageInfo},
  {path: '/home/goodlist', name:'goodlist', component: goodList},
  {path: '/home/goodinfo/:id', name: 'goodinfo', component: goodInfo}
]

// 创建vue-router实例
const router = new VueRouter({
  routes,
  mode: 'hash'
})

// 导出router
export default router
