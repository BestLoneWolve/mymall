<template>
  <div class='nav-bar'>
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="reght"></slot></div>
  </div>
  
</template>

<script>
export default {
  name:'NavBar',

}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
  }
  .right,.left {
    width: 60px;
    /*background-color: red;*/
  }
  .center {
    flex: 1;
    text-align:center;
  }

</style>