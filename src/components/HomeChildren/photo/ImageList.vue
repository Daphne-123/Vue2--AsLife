<template>
  <div class="imageListBox">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height:100vh; overflow-y: auto"
      class="imageList">
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/home/imageinfo/'+ item.id">
        <img v-lazy="item.img_url">
          <div class="info">
            <h4 class="info_title">{{item.title}}</h4>
            <p class="info_abstract">{{item.abstract}}</p>
          </div>
        </router-link>
      </li>
      <!-- 加载动画 -->
      <li class="spinner">
        <mt-spinner type="fading-circle" v-show="loading_more"></mt-spinner>
        <p v-show="loading_finished">已经加载全部信息</p>
      </li>
    </ul>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
  name: 'imageList',
  data() {
    return {
      isLoading: false,
      loading_more: false,
      loading_finished: false,
      pageindex: 1,
      pagesize: 5,
      list: []
    }
  },
  methods: {
    async loadMore() {
      this.isLoading = true
      const {data: res} = await this.$axios.get('images/imageslist',{params: {pageindex: this.pageindex, pagesize: this.pagesize}})
      console.log(res)
      if(res.Status == 0) {
        if(res.Data.length > 0) {
          this.list = this.list.concat(res.Data)
          this.pageindex++
          // 开启上滑
          this.isLoading = false
          this.loading_more = true
          this.loading_finished = false
        }else { // 数据加载完
          this.isLoading = true
          this.loading_more = false
          this.loading_finished = true
        }
      }else { // 请求数据失败
        Toast('服务器崩溃了！')
      }
    }
  }
}
</script>
<style lang="less">
  .imageListBox {
    .imageList {
      padding: 10px;
      margin: 0;
      li {
        list-style: none;
        margin-bottom: 8px;
        position: relative;
        img {
          width: 100%;
          height: 260px;
          box-shadow: 0 2px 4px rgb(224, 215, 215);
        }
        image[lazy=loading] {
          width: 400px;
          height: 260px;
          margin: auto;
        }
        .info {
          position: absolute;
          bottom: 0;
          padding: 5px;
          color: #eee;
          background-color: rgba(0,0,0,.4);
          .info_title {
            font-size: 14px;
          }
          .info_abstract {
            color: #eee;
            font-size: 12px;
          }
        }
      }
      .spinner {
        font-size: 12px;
        color: #aaa;
        text-align: center;
        border: none;
        .mint-spinner-fading-circle {
          position: relative;
          left: 45%;
        }
      }
    }
  }
</style>