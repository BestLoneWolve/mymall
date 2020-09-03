<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if='!isActive'><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active:isActive}"><slot name="item-text"></slot></div>
    
    
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props:{
      path: String
  },
  data(){
    return {
      //isActive:true
    }
  },
  methods:{
      itemClick(){
          this.$router.replace(this.path)
      }
  },
  computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) != -1 //.$route找到的是处于活跃的路由
      }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 10px;
    
  }
  .tab-bar-item img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-top: 7px;
  }
  .active {
      color:red;
  }
</style>