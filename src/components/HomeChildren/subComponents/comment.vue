<template>
  <div class="commentBox">
    <div class="commentHeader">
      <h3>观点</h3>
    </div>
    <div class="commentList">
      <ul>
        <li v-for="item in list" :key="item.id">
          <p>
            <span class="mui-icon mui-icon-contact"></span>
            <span class="user">匿名用户</span>
            <span class="add_time">{{item.add_time | dateFormat}}</span>
          </p>
          <p class="content"> 
            {{item.content}}
          </p>
        </li>
      </ul>
      <button type="button" class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined" @click="loadMoreComment">加载更多评论</button>
    </div>
    <div class="postComment">
      <p>
        <span>发表观点</span>
        <span @click="postComment">发送</span>
      </p>
      <textarea rows="3" class="textMsg" placeholder="优质观点将在前排展示" v-model="msg"></textarea>
    </div>
  </div>
</template>
<script>
// 导入Toast这个函数
import {Toast} from 'mint-ui'  
// 导入qs
import qs from 'qs'
export default {
  data() {
    return {
      pageindex: 1,
      pagesize: 10,
      list: [],
      msg: ''
    }
  },
  created() {
    // 调用getComments
    this.getComments()
  },
  methods: {
    async getComments() {
      const {data: res} = await this.$axios.get('comment',{params: {srcid: this.id, pageindex: this.pageindex, pagesize: this.pagesize}})
      if(res.Status == 0) {
        if(res.Data.length > 0) {
          // 通过concat进行连接
          this.list = this.list.concat(res.Data)
        }else {
          // 显示一个小提示
          Toast({
            message: '没有更多评论了',
            duration: 3000
          })
        }
      }else {
        Toast({
          message: '请求评论失败',
          duration: 3000
        })
      }
    },
    loadMoreComment() {
      // 评论页码加一，并且再次对评论的数据进行请求
      this.pageindex++;
      this.getComments()
    },
    // 通过post请求向服务器发送数据（发送评论）
    async postComment() {
      if(this.msg.length > 0) {
        // 如果是get请求传参，使用params属性
        // 如果是post请求传参，使用data属性
        // srcId为被评论对象的id值，其值已经通过props方式从父组件中传递了过来
        const postData = qs.stringify({srcId: this.id, content: this.msg, add_time: new Date()})
        const {data:res} = await this.$axios.post('comment',
          postData,
          // 添加请求头，以表单的形式传递到后端
          {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
        )
        // this.$axios({
        //   method: 'post',
        //   url: 'comment',
        //   data: qs.stringify({
        //     srcId: this.id, content: this.msg, add_time: new Date() 
        //   })
        // })
        // 将新添加的评论（发表评论），追加到list首部（使用unshift）中
        const key = new Date().getMilliseconds()
        // 通过日期中的秒数来给id设置属性值，目的是为不让每个对象的key重复
        this.list.unshift({id: key, content: this.msg, srcId: this.id, add_time: new Date()})
        // 将评论区域置为空
        this.msg = ''
        
      }else { // 如果评论为空，则不能发送评论
        Toast({
          message: '不能发送空评论',
          duration: 3000,
          // position: 'bottom'
        })
      }
    }
  },
  // 将父组件的id值赋值给子组件的id值，以便清晰是哪一个页面下的评论区域
  props: ["id"]
}
</script>
<style lang="less">
.commentBox {
  .commentHeader {
    padding: 10px 0;
    border-bottom: 1px solid #dddddd;
    h3 {
      border-left: 5px solid red;
      padding-left: 10px;
      font-size: 18px; 
      color: #333;
    }
  }
  .commentList {
    ul {
      list-style: none;
      padding: 0;
      li {
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #dddddd;
        p {
          padding: 5px 0;
          margin: 0;
          font-size: 14px;
          span {
            padding-right: 15px;
          }
          .user {
            color:darkgoldenrod;
          }
        }
        p.content {
          padding-left: 40px;
          font-size: 16px;
        }
      }
    }
    button {
      padding: 10px 0;
    }
  }
  .postComment {
    p {
      display: flex;
      justify-content: space-between;
      span {
        padding: 5px;
      }
    }
    .textMsg {
      color: #444;
      font-size: 14px;
    }
  }
}
</style>