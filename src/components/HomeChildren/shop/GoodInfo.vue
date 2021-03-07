<template>
  <div class="goodInfoBox">
    <!-- 轮播图区域 -->
    <swipe :imglist="swipeList"></swipe>
    <!-- 商品信息区域 -->
    <div class="goodInfo">
      <p class="price">
        <span class="sellPrice">
          <span>¥</span>
          {{goodInfo.sell_price}}
        </span>
        <span class="marketPrice">
          <label class="lb">商场价：</label>
          {{goodInfo.market_price}}
        </span>
      </p>
      <p class="title">{{goodInfo.title}}</p>
      <p class="abstract">{{goodInfo.abstract}}</p>
      <p class="add_time">
        <label class="lb">发布时间：</label>
        {{goodInfo.add_time | dateFormat}}
      </p>
      <p class="stock">
        <span>
          <label class="lb">库存：</label>
          {{goodInfo.stock}}
        </span>
        <span>
          <label class="lb">关注度：</label>
          {{goodInfo.click_count}}
        </span>
      </p>
      <p class="count">
        <label class="lb">购买数量：</label>
        <number-box :max="goodInfo.stock" :min="1" :initCount="1" :goodId="goodId" :isChangeStore="false" @getCount="getGoodCount"></number-box>
      </p>
      <p>
        <button type="button" class="mui-btn mui-btn-warning" @click="addToCart">
          加入购物车
        </button>
        <button type="button" class="mui-btn mui-btn-danger">
          立即购买
        </button>
      </p>
    </div>
    <!-- 卖家信息区域 -->
    <div class="sellerInfo">
      <h3>卖家信息</h3>
      <p class="seller">
        <label class="lb">卖家：</label>
        {{goodInfo.seller}}
      </p>
      <p class="seller_phone">
        <label class="lb">电话：</label>
        {{goodInfo.seller_phone}}
      </p>
    </div>
    <!-- 商品详情图片区域 -->
    <div class="imgInfo">
      <ul>
        <li v-for="item in swipeList" :key="item.id">
          <img :src="item.img_url" alt="">
        </li>
      </ul>
    </div>
    <!-- 评论区域 -->
    <comment :id="goodId"></comment>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
import swipe from '../subComponents/swipe.vue'
import numberBox from '../subComponents/NumberBox.vue'
import comment from '../subComponents/comment.vue'
export default {
  data() {
    return {
      // 获取当前商品详情页的id
      goodId: this.$route.params.id,
      swipeList: [],
      goodInfo: {},
      goodCount: ''
    }
  },
  components: {
    swipe,
    numberBox,
    comment
  },
  created() {
    this.getSwipeInfo()
    this.getGoodInfo()
  },
  methods: {
    // 获取商品详情信息的轮播图
    async getSwipeInfo() {
      const {data: res} = await this.$axios.get('thumbs/' + this.goodId)
      if(res.Status == 0) {
        this.swipeList = res.Data
      }else {
        Toast('服务器崩溃了！')
      }
    },
    // 获取商品详情信息的商品区域信息
    async getGoodInfo() {
      const {data: res} = await this.$axios.get('goods/goodsinfo',{params: {goodsid: this.goodId}})
      if(res.Status == 0) {
        this.goodInfo = res.Data[0]
      }else {
        Toast('服务器崩溃了！')
      }
    },
    // 将商品数据添加到购物车中
    addToCart() {
      const goods = {
        id: this.goodId,
        img_url: this.goodInfo.img_url,
        title: this.goodInfo.title,
        price: this.goodInfo.sell_price,
        count: this.goodCount,
        stock: this.goodInfo.stock
      }
      // 调用vuex中的mutations中的addToCart，来间接处理state中的cart
      this.$store.commit('addToCart', goods)
      console.log(this.$store.state.cart)
    },
    getGoodCount(count) {
      this.goodCount = count
      console.log(count)
    }
  }
}
</script>
<style lang="less">
  .goodInfoBox {
    padding: 8px;
    .goodInfo {
      padding: 5px;
      background-color: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
      p {
        font-size: 14px;
        line-height: 16px;
        color: #333;
        margin: 20px;
        font-family: '微软雅黑';
        label.lb {
          color: #999;
          margin-right: 10px;
        }
      }
      .price {
        .sellPrice {
          color: #ce0000;
          font-size: 28px;
          font-weight: bold;
          margin-right: 20px;
          span {
            font-size: 12px;
          }
        }
        .marketPrice {
          text-decoration: line-through;
          .lb {
            margin: 0;
          }
        }
      }
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .abstract {
        font-size: 15px;
        line-height: 20px;
      }
      .stock {
        span {
          margin-right: 10px;
        }
      }
    }
    .sellerInfo {
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      h3 {
        font-size: 14px;
        color: #999;
        margin-bottom: 20px;
      }
      p {
        color: #333;
        label.lb {
          color: #999;
          margin-right: 20px;
        }
      }
    }
    .imgInfo {
      background-color: #fff;
      border-radius: 5px;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          width: 100%;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>