<template>
  <div class="shop-list">
    <scroll class="content" ref="scroll">
      <!--li v-for="item in list" style = "height: 100px; width: 100px">{{item}}</li-->
      <shop-list-item v-for="(item, index) in list" :key="index" :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll"

import ShopListItem from "./ShopListItem"

import {mapGetters} from "vuex"

export default {
  name: 'ShopList',
  components:{
    ShopListItem,
    Scroll
  },
  computed: {
    ...mapGetters({
      list: 'cartList'  //这里记得加单引号
    })
  },
  activated(){
    this.$refs.scroll.refresh()
    //console.log("a")
  }
}
</script>

<style scoped>
  .shop-list{
    height: calc(100vh - 93px);/*使用calc时，计算符号前后要有空格*/
  }
  .content{
    height: 100% ;
    overflow: hidden;
  }
</style>