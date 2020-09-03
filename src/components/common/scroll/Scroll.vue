<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props:{
    probeType: {
        type: Number,
        default(){
            return 0
        }
    },
    pullUpLoad:{
        type: Boolean,
        default(){
            return true
        }
    }
  },
  data(){
    return{
        scroll: null
    }
  },
  mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        pullUpLoad: this.pullUpLoad,//允许加载更多
        click: true,//使得滚动内容中点击能够触发
        probeType: this.probeType//设置滚动类型，有四种0，1，2，3。3是允许监听滚动距离
      })
      if(this.probeType===2||this.probeType===3){
        this.scroll.on('scroll',(position)=>{//监听滚动的高度和宽度
          //console.log(position)
          this.$emit('scroll',position)
        }) 
      }
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{//监听是否滚到底部
            //console.log('上拉加载更多')
          this.$emit('pullingUp')
        }) 
      }
      
  },
  methods:{
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        //console.log('refresh')
        this.scroll && this.scroll.refresh()//要等scroll加载完才可以调用他的函数否则会报错
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
  }
}
</script>

<style scoped>

</style>