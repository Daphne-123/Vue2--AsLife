<template>
  <div class="goodListBox">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height:100vh; overflow-y: auto"
      class="mui-table-view">
      <li v-for="item in list" :key="item.id" class="mui-table-view-cell mui-media" @click="goTo(item.id)">
        <img :src="item.img_url" class="mui-media-object mui-pull-left">
        <div class="mui-media-body">
          <h3 class="title">{{item.title}}</h3>
          <p class="price">
            <span class="sellPrice">售价：¥{{item.sell_price}}</span>
            <span class="markPrice">原价：¥{{item.market_price}}</span>
          </p>
          <p class="stock">库存：{{item.stock}}</p>
          <button type="button" class="mui-btn mui-btn-danger">立即抢购</button>
        </div>
      </li>
      <!-- 动画加载 -->
      <li class="spinner">
        <mt-spinner type="fading-circle" v-show="loading_more"></mt-spinner>
        <span v-show="loading_finished">已经加载全部信息</span>
      </li>
    </ul>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      isLoading: false,
      loading_more: false,
      loading_finished: false,
      pageindex: 1,
      pagesize: 10,
      list: []
    }
  },
  methods: {
    async loadMore() {
      this.isLoading = true
      const {data: res} = await this.$axios.get('goods/goodslist',{params: {pageindex: this.pageindex, pagesize: this.pagesize}})
      if(res.Status == 0) {
        if(res.Data.length > 0) {
          this.list = this.list.concat(res.Data)
          this.pageindex++
          this.isLoading = false
          this.loading_more = true
        }else { // 数据加载完毕
          this.isLoading = true
          this.loading_more = false
          this.loading_finished = true
        }
      }else {
        Toast('服务器崩溃了！')
      }
    },
    // 通过编程式跳转路由
    goTo(goodId) {
      this.$router.push({name: 'goodinfo', params: {id: goodId}})
    }
  }
}
</script>
<style lang="less">
  .goodListBox {
    .mui-table-view-cell {
      .mui-media-object {
        max-width: 120px;
        height: 100px;
      }
      .mui-media-body {
        .title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          padding-bottom: 18px;
        }
        .price {
          font-size: 12px;
          color: #888;
          margin: 0;
          .sellPrice {
            font-size: 18px;
            color: #ce0000;
            font-weight: bold;
            margin-right: 10px;
          }
          .markPrice {
            text-decoration: line-through;
          }
        }
        .stock {
          margin-top: 5px;
        }
        .mui-btn-danger {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
      }
    }
    .spinner {
      font-size: 12px;
      color: #aaa;
      text-align: center;
      border: none;
      // 给加载中动画设置样式
      .mint-spinner-fading-circle {
        position: relative;
        left: 45%;
      }
    }
  }
</style>