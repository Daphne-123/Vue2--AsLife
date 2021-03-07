<template>
  <div class="swipeBox">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in imglist" :key="item.id">
        <img :src="item.img_url" alt="" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  // 由父组件传递过来的值
  props: ["imglist"]
}
</script>
<style lang="less">
  .swipeBox {
    .mint-swipe {
      width: 100%;
      height: 260px;
      img {
        width: 100%;
        height: 260px;
        // position: absolute;
      }
    }
  }
</style>