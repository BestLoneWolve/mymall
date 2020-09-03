<template>
  <div class="recommends">
      <div v-for="item in recommends" class="recommend-items">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
      recommends: {
          type: Array,
          default(){
              return []
          }
      }
  }
}
</script>

<style>
  .recommends{
      display: flex;
      text-align: center;
      font-size: 13px;
      padding: 10px 0 15px 0;
      border-bottom: 8px solid #eee;
  }
  .recommend-items{
      flex: 1;
  }
  .recommend-items img {
      width: 70px;
      height: 70px;
      margin-bottom: 6px;
  }
</style>