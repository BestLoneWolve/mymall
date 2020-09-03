<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick"><img src="~assets/img/common/back.svg" alt=""></div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item"
        :class="{active:index === currentIndex}" @click="titleClick(index)">{{item}}</div>    
      </div>
    </nav-bar>
  </div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles: ["商品","参数","评论","推荐"],
      currentIndex: 0
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index  //记录点击到那个标签，改变currentIndex
      this.$emit("titleClick",index)  //将标题点击事件发送出去，以及点击到那个标题的标志
    },
    backClick(){
      this.$router.back()//返回上一个router
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
    font-size: 13px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text)
  }
  .back{
    margin-top: 6px;
    margin-left: 15px;
  }
</style>