<template>
  <div class="mui-card">
    <div class="mui-card-header mui-card-media">
      <img src="../lib/images/logo.png"/>
      <div class="mui-media-body">
        小M
        <p>{{getCurrentTime | dateFormat}}</p>
      </div>
    </div>
    <div class="mui-card-content" >
      <img src="../lib/images/yuantiao.jpg" alt="" width="100%"/>
    </div>
    <div class="mui-card-footer">
      <a class="mui-card-link">Like</a>
      <a class="mui-card-link">Comment</a>
      <a class="mui-card-link">Read more</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentTime: ''
    }
  },
  computed: {
    getCurrentTime() {
      return this.currentTime = new Date()
    }
  }
}
</script>