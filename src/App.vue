<template>
  <div id="app" class="appContent">
    <!-- 头部 -->
    <header id="header" class="mui-bar mui-bar-nav">
			<!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" v-show="isShow" @click="goBack"></a>
			<h1 class="mui-title">爱安师 - 爱生活</h1>
		</header>
    <!-- 内容 -->
    <div class="mui-content">
      <transition>
        <!-- 使用keep-alive来保存当前状态 -->
        <!-- include的值为需要保存组件的name值 -->
        <keep-alive include="newsList,imageList">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- footer -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/category" class="mui-tab-item">
				<span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
				<span class="mui-tab-label">分类</span>
      </router-link>
      <router-link to="/find" class="mui-tab-item">
				<span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
				<span class="mui-tab-label">发现</span>
      </router-link>
      <router-link to="/cart" class="mui-tab-item">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{$store.getters.getTotalCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/profile" class="mui-tab-item">
				<span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
				<span class="mui-tab-label">我的</span>
      </router-link>
    </nav>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isShow: false
    }
  },
  // 在模板创建好时，对当前路由进行判断
  created() {
    if(this.$route.path == '/home') {
      this.isShow = false
    }else {
      this.isShow = true
    }
  },
  // 监听当前活跃路由
  watch: {
    // 判断改变后的值(当前路由的地址)是否为home
    "$route.path": function(newVal) {
      if(newVal == '/home') {
        this.isShow = false
      }else {
        this.isShow = true
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  /* 引入样式表 */
  @import './lib/css/mui.css';
  @import './lib/css/icons-extra.css';
  .appContent {
    overflow: hidden;
    padding-bottom: 50px;
    .mui-bar-nav {
      background: skyblue;
      h1 {
        color: #f5f5f5;
        font-weight: bold;
      }
    }
    .mui-bar-tab {
      .router-link-active {
        color: skyblue;
      }
    }
    .mui-content {
      overflow: hidden;
    }
    /*
    * 拥有transition标签的才拥有v-enter等类
     */
    .v-enter {
      transform: translate(400px);
    }
    .v-leave-to {
      position: absolute;
      transform: translate(-400px);
    }
    v-enter-active, .v-leave-active {
      transition: all 1s ;
    }
  }
</style>
