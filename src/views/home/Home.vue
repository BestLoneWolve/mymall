<template>
  <div id="home">
    <nav-bar class='home-nav'>
      <div slot='center'>购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl1" class="tab-control" 
        v-show="isTabFixed"/>
      <scroll class="content" 
      ref="scroll" 
      :probe-type="3" :pull-up-load = "true" 
      @scroll="contentScroll" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"/>
        <recommend-view :recommends="recommends"/>
        <fashion-view/>
        <tab-control :titles="['流行','新款','精选']" 
        @tabClick="tabClick" ref="tabControl2"/>
        <good-list :goods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShow"/> <!--记得加.native-->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
//import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childcomp/HomeSwiper'
import RecommendView from './childcomp/RecommendView'
import FashionView from './childcomp/FashionView'


import {getHomeMultiData, getHomeGoods} from 'network/home'
import {debounce} from "common/tools"
import {itemListenerMixin, backTopMixin} from "common/mixin"
//import BScroll from 'better-scroll' 第三方插件不要直接使用，要把它封装起来


export default {
  name: 'Home',
  data(){
    return{
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShow: "false",  //存储backtop标签是否显示的标志
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FashionView,
    TabControl,
    GoodList,
    Scroll,
    
  },
  mixins:[itemListenerMixin, backTopMixin],
  created(){
    //请求多个数据
    this.getHomeMultiData()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell') //为了使create()中的结构不复杂，需要在methods中对这些执行的函数进行封装
  },
  mounted(){
    /*//1.图片加载完的事件监听
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //对监听图片加载完成要执行的函数进行保存
    this.itemImgListener = () => { refresh() }//refresh在Scroll.vue中已封装
    //监听goodlistitem中图片加载完成
    this.$bus.$on('itemImgLoad',this.itemImgListener)//采用this.$refs获取节点不要在created中执行，要在mounted中。*/
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY)//在进入当前路由时，直接滚动到指定位置
    this.$refs.scroll.refresh()    //刷新滚动高度
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()//在离开当前路由时记录滚动位置
    this.$bus.$off("itemIngLoad",this.itemImgListener)//当离开当前界面时，取消监听goodlistitem中的图片加载完成事件,即取消全局监听事件
  },
  methods: {

    //网络请求
    getHomeMultiData(){
      getHomeMultiData().then(res=>{
      //console.log(res)
      //this.result=res//this指向最外层的整个vue对象，将数据保存起来
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list)//将数组解构后才能用push方法一个个传入数组中
      //console.log(this.goods[type].list)
      this.goods[type].page+=1;
      this.$refs.scroll.finishPullUp()
    })
    },

    //事件监听
    tabClick(index){
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index//使得tabcontrol在两个交换显示时，被选中的选项能够保持不变
    },
    /*backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500) //获取文件节点，调用scroll对象中的scrollTo方法回到顶部 
    },*/
    contentScroll(position){
      //1.判断backTop是否要显示
      this.backTopListener(position)

      //2.决定tabcontrol的样式(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImgLoad(){
      //2.获取tabcontrol的offsetTop
      //所有组件都有一个属性 $el 用于获取组件中的元素的
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop//等到轮播图都加载完再读取offsettop
    }
    /*debounce(func,delay){//创建防抖函数,将函数另外封装在tools.js中
      let timer = null
      return function(...args){
        if(timer)clearTimeout(timer)
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    }
    /*防抖动原理：让要执行的函数每次都在定时器中运行，在这个例子中是
    每有一张图片加载完就进入定时器中，但是当有另一张图片加载完又重新清空定时器
    这样，只要设置的执行时间足够长，就就可以在最后一张图片加载完之后再执行滚动高度刷新*/
  }
}
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh; /*viewpoit height 视口高度，100%视口高度*/
    position: relative;
  }
  .home-nav{
   background-color: var(--color-tint);
   color: white;
   /*position: fixed;
   left: 0;
   top: 0;
   right: 0;
   z-index: 9;*/
 } 
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
    background-color: white;
  }
  /*.content{
    height: calc(100%-93px);/*计算滑动窗口的高，100%是父元素的高-导航块和下标块的高
    
  }*/
</style>