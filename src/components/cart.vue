<template>
  <div class="cartBox">
    <h2>购物车</h2>
    <ul class="mui-table-view">
      <router-link class="mui-table-view-cell mui-media" v-for="item in cart" :key="item.id" tag="li" :to="'/home/goodinfo/' + item.id">
        <img :src="item.img_url" class="mui-media-object mui-pull-left">
        <div class="mui-media-body">
          <p class="goodInfo">
            <span class="title">{{item.title}}</span>
            <span class="price">¥{{item.price}}</span>
          </p>
          <p class="goodControl">
            <number-box :min="1" :max="item.stock" :initCount="item.count" :goodId="item.id" :isChangeStore="true"></number-box>
            <!-- 给click添加一个stop，防止点击删除时跳转到商品详情页面 -->
            <span class="remove" @click.stop="remove(item.id)">×</span>
          </p>
        </div>
      </router-link>
      <li class="mui-table-view-cell mui-media totalPrice">
        总金额：<span class="price">¥{{$store.getters.getTotalPrice}}</span>
        </li>
    </ul>
    <button type="button" class="mui-btn mui-btn-danger mui-btn-block">结算</button>
  </div>
</template>
<script>
import numberBox from '../components/HomeChildren/subComponents/NumberBox.vue'
export default {
  data() {
    return {
      cart: []
    }
  },
  components: {
    numberBox
  },
  created() {
    // 调用getTotalGoods()
    this.getTotalGoods()
  },
  methods: {
    // 调用store中的removeGood
    remove(goodId) {
      this.$store.commit('removeGood',goodId)
      // 调用getTotalGoods，保证数据的实时化
      this.getTotalGoods()
    },
    getTotalGoods() {
      // 如果localStorage中存在键为cart的数据时，则将其值赋值给cart；否则，将[]赋值给cart
      // 值得注意的是，获取localStorage的数据时，必须将其进行反序列化（JOSN.parse）
      this.cart = JSON.parse(window.localStorage.getItem(('cart') || '[]'))
    }
  }
}
</script>
<style lang="less">
  .cartBox {
    h2 {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      color: #444;
      padding: 8px;
      background-color: #fff;
    }
    .mui-table-view {
      margin: 0;
      .mui-table-view-cell {
        width: 100%;
        .mui-media-object {
          max-width: 80px;
          height: 80px;
        }
        .mui-media-body {
          .goodInfo {
            font-size: 16px;
            color: #444;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            .price {
              color: #222;
              font-weight: bold;
            }
          }
          .goodControl {
            display: flex;
            justify-content: space-between;
            .remove {
              font-size: 36px;
              padding: 10px;
            }
          }
        }
      }
      li.totalPrice {
        font-size: 16px;
        color: #333;
        font-weight: bold;
        text-align: center;
        background-color: #fff;
        padding: 10px;
        .price {
          color: #dd524d;
        }
      }
    }
    .mui-btn-danger {
      position: fixed;
      bottom: 45px;
    }
  }
</style>