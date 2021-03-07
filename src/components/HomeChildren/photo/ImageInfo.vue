<template>
  <div class="imageInfoBox">
    <!-- 顶部 基础信息 -->
    <section class="baseInfo">
      <h3 class="title">{{imgInfoList.title}}</h3>
      <p class="subInfo">
        <span class="author">发布者：{{imgInfoList.author}}</span>
        <span class="add_time">日期：{{imgInfoList.add_time | dateFormat}}</span>
        <span class="click_count">阅读：{{imgInfoList.click_count}}</span>
      </p>
    </section>
    <!-- 简介 -->
    <section class="abstract">
      <p v-html="imgInfoList.abstract"></p>
    </section>
    <!-- 缩略图 -->
    <section class="thumbs">
      <!-- 通过vue-preview来展示缩略图 -->
      <vue-preview :slides="imgThumbsInfo" class="imgPreview"></vue-preview>
    </section>
    <!-- 评论区 -->
    <section class="comment">
      <!-- 使用评论组件，将当前活跃路由的imgId赋值给评论组件的id -->
      <comment :id="imgId"></comment>
    </section>
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
// 导入评论组件
import comment from '../subComponents/comment.vue'
export default {
  data() {
    return {
      imgId: this.$route.params.id,
      imgInfoList: {},
      imgThumbsInfo: []
    }
  },
  components: {
    comment
  },
  created() {
    this.getImgInfo(),
    this.getImgThumbs()
  },
  methods: {
    // 请求图片详情的基本信息
    async getImgInfo() {
      const {data: res} = await this.$axios.get('images/imagesinfo',{params: {imgid: this.imgId}})
      console.log(res)
      if(res.Status == 0) {
        this.imgInfoList = res.Data[0]
      }else {
        Toast('服务器出错')
      }
    },
    // 请求图片详情的缩略图
    async getImgThumbs() {
      const {data: res} = await this.$axios.get('thumbs/' + this.imgId)
      if(res.Status == 0) {
        // 使用vue-preview需要给每个缩略图添加 `w、h、src、msrc`属性
        res.Data.forEach(item => {
          item.w = 600,
          item.h = 400,
          item.src = item.img_url,
          item.msrc = item.img_url
        });
        this.imgThumbsInfo = res.Data
      }
    }
  }
}
</script>
<style lang="less">
  .imageInfoBox {
    padding: 10px;
    .baseInfo {
      border-bottom: 1px solid #bbb;
      .title {
        font-size: 20px;
        color: #333;
        text-align: center;
      }
      .subInfo {
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin: 0;
      }
    }
    .abstract {
      font-size: 14px;
      padding: 10px;
      color: #444;
      text-indent: 2rem;
      line-height: 22px;
    }
    .thumbs {
      .imgPreview {
        .my-gallery {
          figure {
            display: inline-block;
            margin: 9px;
            img {
              width: 80px;
              height: 60px;
            }
          }
        }
      }
    }
  }
</style>