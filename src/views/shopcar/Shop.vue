<template>
  <div class="shop">
    <!--商品的导航-->
    <nav-bar><div slot="center">购物车({{length}})</div></nav-bar>
    <!--商品列表-->
    
      <shop-list></shop-list>
    
    <!--底部汇总-->
    <shop-bottom-bar></shop-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"

import ShopList from "./childcomp/ShopList"
import ShopBottomBar from "./childcomp/ShopBottomBar"

import {mapGetters} from "vuex"

export default {
  name: 'Shop',
  components: {
    NavBar,
    ShopList,
    ShopBottomBar
  },
  computed: {
    //...mapGetters(['cartLength', 'cartList'])
    ...mapGetters({
      length: 'cartLength',
    })
  }, 
  
}
</script>

<style scoped>
  

  .nav-bar{
    background: var(--color-tint);
    color: white;
  } 
</style>