<template>
  <div class="goods" @click="itemClick">
    <img :src="showImg" @load="imgLoad" alt="">
    <div class="goods-info">
      <p>{{goodItem.title}}</p>
      <span class="price">￥{{goodItem.price}}</span>
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
      goodItem:{
          type: Object,
          default(){
              return {}
          }
      }
  },
  computed:{
    showImg(){
      return this.goodItem.image || this.goodItem.show.img //由于有两个组件在获取图片的路径不同，所以设置兼容
    }
  },
  methods: {
    imgLoad(){
      this.$bus.$emit('itemImgLoad') //将图片加载完成这个事件通过事件总线发射出去
    },
    itemClick(){
      //this.$bus.$emit("itemClick")
      //console.log("jump")
      this.$router.push('/detail/'+this.goodItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods {
    padding-bottom: 40px;

    position: relative;
    width: 48%;
    
    
  }

  .goods img {

    width: 100%;
    border-radius: 5px;
  }



  .goods-info {

    font-size: 12px;

    position: absolute;

    bottom: 5px;

    left: 0;

    right: 0;

    overflow: hidden;

    text-align: center;

  }



  .goods-info p {

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

    margin-bottom: 3px;

  }



  .goods-info .price {

    color: var(--color-high-text);

    margin-right: 20px;

  }



  .goods-info .collect {

    position: relative;

  }



  .goods-info .collect::before {

    content: '';

    position: absolute;

    left: -15px;

    top: 0;

    width: 14px;

    height: 14px;

    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

  }
</style>