<template>
  <div class="newsListInfo">
    <!-- 标题部分 -->
    <section class="title">
      <h2>{{news.title}}</h2>
    </section>
    <!-- 编辑（日期、点击量）部分 -->
    <section class="des">
      <p>
        <span class="author">编辑：{{news.author}}</span>
        <!-- 使用全局过滤器来修改日期样式 -->
        <span class="add_time">日期：{{news.add_time | dateFormat}}</span>
        <span class="click_count">阅读：{{news.click_count}}</span>
      </p>
    </section>
    <!-- 图片部分 -->
    <section class="img">
      <img :src="news.img_url" alt="">
    </section>
    <!-- 新闻正文部分 -->
    <section class="content">
      <div v-html="news.content"></div>
    </section>
    <!-- 评论部分 -->
    <section class="comment">
      <!-- 通过封装评论组件 -->
      <comment :id="newid"></comment>
    </section>
  </div>
</template>
<script>
// 导入子组件（评论组件）
import comment from '../subComponents/comment.vue'
export default {
  data() {
    return {
      // 根据当前路由的id来跳转到具体的新闻详情页
      newid: this.$route.params.id,
      // 用来存储数据
      news: {}
    }
  },
  components: {
    comment
  },
  created() {
    //  调用getNewsInfo
    this.getNewsInfo()
  },
  methods: {
    // 获取新闻详情
    async getNewsInfo() {
      const {data: res} = await this.$axios.get('news/newsinfo', {params: {newsid: this.newid}})
      console.log(res)
      if(res.Status == 0) {
        this.news = res.Data[0]
      }
    }
  },
}
</script>
<style lang="less">
  .newsListInfo {
    padding: 15px;
    .title {
      padding: 5px 0;
      font-size: 24px;
      color: #333;
    }
    .des {
      font-size: 12px;
      color: #aaa;
      padding-bottom: 20px;
      p {
        display: flex;
        justify-content: space-between;
      }
    }
    .img {
      img {
        width: 100%;
      }
      padding-bottom: 10px;
    }
    .content {
      font-size: 14px;
      color: #444;
      p {
        text-indent: 20px;
      }
      img {
        width: 100%;
      }
    }
  }
</style>