<template>
  <div class="mui-numbox">
    <button type="button" class="mui-btn mui-btn-numbox-minus" @click.stop="decrement" :disabled="decDisabled">-</button>
    <input type="number" class="mui-input-numbox" :value="currentCount"/>
    <button type="button" class="mui-btn mui-btn-numbox-plus" @click.stop="increment" :disabled="incDisabled">+</button>
  </div>
</template>
<script>
export default {
  props: [
    'initCount',  // 商品数量初始值
    'min',  // 商品数量最小值
    'max',  // 商品数量最大值
    'goodId', // 商品id
    'isChangeStore' // 用来判断是否在修改商品个数的时候影响到store，true/false
  ],
  data() {
    return {
      currentCount: '',
      decDisabled: true,
      incDisabled: false
    }
  },
  created() {
    // 在created钩子函数中，将商品数量初始值赋值给商品当前数量值
    this.currentCount =  this.initCount
  },
  methods: {
    setDisabled() {
      if(this.currentCount >= this.max) {
        this.incDisabled = true
      }else {
        if(this.currentCount <= this.min) {
          this.decDisabled = true
        }else {
          this.incDisabled = false,
          this.decDisabled = false
        }
      }
    },
    increment() {
      if(this.currentCount < this.max) {
        this.currentCount++
      }
      this.setDisabled()
    },
    decrement() {
      if(this.currentCount > this.min) {
        this.currentCount--
      }
      this.setDisabled()
    }
  },
  watch: {
    'currentCount'(newVal, oldVal) {
      this.$emit('getCount',newVal)
      // 当数据发生变化是，调用store中的updateStore，更新store
      if(this.isChangeStore) {
        const goodInfo = {id: this.goodId, count: newVal}
        this.$store.commit('updateStore',goodInfo)
      }
    }
  }
}
</script>
<style lang="less">
  
</style>