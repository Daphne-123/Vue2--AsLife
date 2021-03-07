<template>
  <div class="newsListBox">
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height:100vh; overflow-y: auto"
      class="newsList">
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/home/newsInfo/' + item.id">
          <p class="news_title">{{item.title}}</p>  
          <p class="news_content">
            <span class="author">作者：{{item.author}}</span>
            <span class="add-time">时间：{{item.add_time | dateFormat}}</span>
            <span class="click_count">阅读：{{item.click_count}}</span>
          </p>
        </router-link>
      </li>
      <!-- 加载动画 -->
      <li class="spinner">
        <mt-spinner type="fading-circle" v-show="!loading_more"></mt-spinner>
        <p v-show="loading_more">已经加载全部信息</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'newsList',
  data() {
    return {
      isLoading: false,
      list: [],
      pageindex: 1, 
      pagesize: 10,
      loading_more: false
    }
  },
  // created() {
  //   this.loadMore()
  // },
  methods: {
    /**
     * 请求参数：
     * pageIndex：代表查询哪一页
     * pageSize：每页查询多少个记录 
    **/
   //使用async和await来简化axios
    async loadMore() {
      // 将无限滚动关闭，不进行请求
      this.isLoading = true
      // 加载动画显示
      this.loading_more = false
      // 通过解构赋值，将data的值赋值给res（data就是服务器返回的数据）
      const {data: res} = await this.$axios.get('news/newslist',{
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      })
      if(res.Status == 0) {
        // 在响应数据中遍历每一项，并且添加时间
        res.Data.forEach(item => {
          return item.add_time = new Date()
        });
        // concat：进行连接两个数组a.concat(b)
        this.list = this.list.concat(res.Data)
        this.pageindex++; //页码自增
        // 将无限滚动开启
        this.isLoading = false
        this.loading_more = false // 进行加载动画
        // 如果请求到的数据个数小于页面数据个数，则停止滚动，并且显示“加载完毕”动画
        if(res.Data.length < this.pagesize) {
          this.isLoading = true; // 无限滚动关闭，停止请求
          this.loading_more = true
        }
      }
      else {
        // 如果没拿到数据
        this.loading_more = true
      }
    }
  }
}
</script>
<style lang="less">
  .newsListBox {
    .newsList {
      list-style: none;
      padding: 0 16px;
      li {
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
      }
      p {
        margin: 0;
      }
      .news_title {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
      .news_content {
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
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