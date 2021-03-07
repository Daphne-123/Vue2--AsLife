import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 由于每次刷新页面，都会重新对store这个对象进行刷新，导致cart重新变为空数组（即发生已经添加到购物车的商品被新添加到购物车的商品给挤了出来）
// 所以在刷新页面之前，需要将添加到购物车中的数据取出来，赋值给lsCart
// 然后将lsCart赋值给store对象中state属性下面的cart，这样每次刷新页面就不再会是空的数组，而是已经获取到数据的lsCart
var lsCart = JSON.parse(window.localStorage.getItem('cart') || '[]')

const store = new Vuex.Store({
  state: {
    cart: lsCart
  },
  // mutations相当于组件里面的methods，它只能进行同步操作
  mutations: {
    // 两个参数，其中第一个参数必须有
    addToCart(state,payload) {
      // 通过使用数组中的some方法来寻找到cart中是否有一个对象的id和商品中的某一个对象的id相等
      // 如果有，则不额外在cart中继续添加一个相等的对象
      // 如果没有，则在cart中添加一个对象
      var flag = false
      state.cart.some(item => {
        if(item.id == payload.id) {
          item.count += parseInt(payload.count)
          flag = true
          return true
        }
      })
      if(!flag) {
        state.cart.push(payload)
      }
      // 当store发生改变时，将数据存储到localStorage中，以防止刷新页面时，数据丢失
      // localStorage的value必须是string
      window.localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    // 移除购物车中数据
    removeGood(state, payload) {
      // 遍历state.cart数组，如果购物车中的id和商品id相等时，则将其过滤掉
      state.cart = state.cart.filter(item => {
        return item.id != payload
      })
      // 操作过后，将state.cart中的数据保存到localStorage中
      window.localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    // 实现购物车中修改购买商品的个数，要把总金额进行同步化
    // 并且需要把修改的商品数据同步到localStorage中
    updateStore(state, payload) {
      state.cart.some(item => {
        if(item.id == payload.id) {
          item.count = payload.count
        }
      })
      if(state.cart.length > 0) {
        window.localStorage.setItem('cart',JSON.stringify(state.cart))
      }
    }
  },
  // getters相当于组件中的computed
  getters:{
    getTotalCount(state) {
      let totalCount = 0;
      // 遍历cart，使其所有的商品的count进行相加
      state.cart.forEach(item => {
        totalCount += item.count
      })
      // 计算属性必须有一个返回值
      return totalCount
    },
    // 获取购物车的总金额
    getTotalPrice(state) {
      let TotalPrice = 0
      state.cart.forEach(item => {
        TotalPrice += item.count * item.price
      })
      return TotalPrice
    }
  }
})

// 导出store
export default store