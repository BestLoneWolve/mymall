<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goodItem="item"/>
    
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'
export default {
  name: 'GoodList',
  props: {
      goods: {
          type: Array,
          default(){
              return []
          }
      }
  },
  components: {
      GoodListItem
  }
}
</script>

<style scoped>
.goods{
  
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
  
}

</style>