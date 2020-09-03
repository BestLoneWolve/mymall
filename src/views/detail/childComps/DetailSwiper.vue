<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item class="swiper-item" v-for="item in topImgs">
        <img :src="item" alt="" @load="detailImgLoad">
      </swiper-item>  
    </swiper>
  </div>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
import SwiperItem from 'components/common/swiper/SwiperItem'
export default {
  name: "DetailSwiper",
  props: {
    topImgs: {
      type: Array,
      default(){
        return []
      }
    },
    
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    detailImgLoad(){
      this.$emit("detailImgLoad")
    }
  }
}
</script>

<style scoped>
.swiper-item{
  height: 300px;
  overflow: hidden;
}
</style>