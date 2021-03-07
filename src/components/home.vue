<template>
  <div class="container">
    <!-- 轮播图 -->
    <!-- 使用轮播图组件 -->
    <swipe :imglist="imgList"></swipe>
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newsList">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">安师新闻</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/imagelist">
          <span class="mui-icon mui-icon-email"></span>
          <div class="mui-media-body">光影安师</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodlist">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">安师商城</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">记录安师</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">一卡通</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">校园社团</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/">
          <span class="mui-icon mui-icon-gear"></span>
          <div class="mui-media-body">户外出行</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/">
          <span class="mui-icon mui-icon-info"></span>
          <div class="mui-media-body">休闲娱乐</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/">
          <span class="mui-icon mui-icon-more"></span>
          <div class="mui-media-body">考研交流</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
// 导入轮播图组件
import swipe from '../components/HomeChildren/subComponents/swipe.vue'
export default {
  data() {
    return {
      imgList: [],
    };
  },
  components: {
    swipe
  },
  created() {
    this.getSwipeData();
  },
  methods: {
    async getSwipeData() {
      const {data: res} = await this.$axios.get("sliderlist")
      this.imgList = res.Data
    },
  },
};
</script>
<style lang="less">
.container {
  .mui-grid-view {
    padding-bottom: 50px;
  }
}
</style>