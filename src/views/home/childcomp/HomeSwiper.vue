<template>
      <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'
export default {
  name: "HomeSwiper",
  data(){
    return {
      isLoad: false
    }
  },
  props: {
      banners:{
          type: Array,
          default(){
              return []
          }
      }
  },
  components: {
    Swiper,
    SwiperItem  
  },
  methods: {
    imgLoad(){
      if(!this.isLoad){//设置这个只要其中有一张图片加载完，就发送一次，剩下的不发送
        this.$emit("swiperImgLoad")
        this.isLoad = true
      }
    }
  }
}
</script>

<style>

</style>