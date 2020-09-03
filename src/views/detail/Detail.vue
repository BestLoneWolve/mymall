<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-imgs="topImg" /><!--这里将子组件的数据绑定到父组件中，这样在子组件中可以通过props拿到数据-->
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/><!--驼峰命名法记得改成-的形式-->
      <detail-param-info ref="param" :param-info="goodsParam"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <!--detail-recommend-info :recommend-list="recommendList"/-->
      <good-list ref="recommend" :goods="recommendList"/>
      
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShow"/>
    <!--toast :message="message" :show="show"></toast-->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"//引入标题栏组件
import DetailSwiper from "./childComps/DetailSwiper"//引入轮播图组件
import DetailBaseInfo from "./childComps/DetailBaseInfo"//引入商品详情组件
import DetailShopInfo from "./childComps/DetailShopInfo"//引入店铺信息组件
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"//引入商品详情信息组件
import DetailParamInfo from "./childComps/DetailParamInfo"//引入商品参数信息组件
import DetailCommentInfo from "./childComps/DetailCommentInfo"//引入评论组件
import DetailRecommendInfo from "./childComps/DetailRecommendInfo"//引入推荐组件
import DetailBottomBar from "./childComps/DetailBottomBar"//引入底部工具栏组件


import Scroll from 'components/common/scroll/Scroll'//引入bscroll工具优化滚动
import GoodList from 'components/content/goods/GoodList'//引入商品展示组件
//import Toast from "components/common/toast/Toast" //引入弹框组件

import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "network/detail"  //引入网络请求函数
import {debounce} from "common/tools"    //引入防抖函数
import {itemListenerMixin, backTopMixin} from "common/mixin"   //引入混入函数
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailRecommendInfo,
    DetailCommentInfo,
    GoodList,
    DetailBottomBar,
    //Toast
  },
  data(){
    return {
      iid: null,
      topImg: [],
      goods: {},
      shop: {},
      itemInfo: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],    //保存Detail中各个部分要滚动的offsetTop值距离
      getThemeTop: null, //定义一个获取主题offsetTop的函数
      currentIndex: 0,   //记录滚动到哪个主题
      //isShow: false,     //记录backtop模块是否显示的标签  
      //message: "" ,
      //show: false
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  mounted(){
    //这里的内容有通过mixin传入一部分
    
  },
  destroyed(){   //注意这里是在destroyed中实现的
    this.$bus.$off("itemIngLoad",this.itemImgListener)//当离开当前界面时，取消监听goodlistitem中的图片加载完成事件,即取消全局监听事件
  },
  created(){
    //1.保存传入的iid
    this.iid = this.$route.params.iid//获取url后面跟着的参数
    
    //2.根据iid请求数据
    getDetail(this.iid).then(res=>{  //记得是.then
      //console.log(res.result)
      const data = res.result
      this.topImg = res.result.itemInfo.topImages //从结果中提取出轮播图图片 
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)//获取商品信息
      this.shop = new Shop(data.shopInfo)    //保存店铺数据
      this.detailInfo = data.detailInfo      //保存商品具体数据
      this.itemInfo = data.itemInfo
      this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)     //保存商品参数数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];   //保存评论数据
      }
      /*采用下面方法获取offsetTop值不对，原因是图片没有加载完
        this.$nextTick(()=>{  //在获取数据，并且整个页面渲染完成之后才会执行的函数
        //根据最新的数据，对应的DOM被渲染出来了
        //但是图片没有加载完成，获取到的offsetTop不包含图片
        //offsetTop值不对基本都是由于图片未加载完的原因
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      })*/
      
    }),
    getRecommend().then((res, error) => {   //由于推荐信息保存在另外一个url中，因此要重新封装一个网络请求函数并引进
        if (error) return
        this.recommendList = res.data.list  //保存推荐信息数据
        //console.log("aaa")
    })
    //给getThemeTop进行防抖操作,因为该事件每有一张图片加载完就会触发，触发太频繁
    this.getThemeTop = debounce(()=>{
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      //console.log(this.themeTopYs)
    },100)
  },
  /*mounted(){
    this.$bus.$on('itemImgLoad1',()=>{     //接收来自GoodsItemList1中的图片加载完成事件
      this.$refs.detailScroll.refresh()    //refresh在Scroll.vue中已封装
      //console.log(this.$refs.detailScroll)
    })//采用this.$refs获取节点不要在created中执行，要在mounted中。
  },*/
  methods:{
    ...mapGetters(["addCart"]),//函数映射
    imgLoad(){
      this.$refs.scroll.refresh() //图片加载完刷新滚动高度
      this.getThemeTop()
    },
    contentScroll(position){
      this.backTopListener(position)
      //console.log(this.isShow)
      //获取y值
      const positionY = -position.y  //注意加负号
      //和不同主题的y值对比
      let l = this.themeTopYs.length
      for (let i = 0; i<l-1; i++){
        /*if (this.currentIndex != i && (i<l-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1] || i==l-1 && positionY>=this.themeTopYs[i])){
          this.currentIndex = i
          //console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex  //将参数传动给标题组件
        }*/
        if(this.currentIndex != i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i
          //console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex  //将参数传动给标题组件
        }
      }
    },
    titleClick(index){ //点击对应标题滚动到相应内容
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 250) //记得这里是负值
    },
    /*backClick(){    //点击回到顶部事件
      this.$refs.scroll.scrollTo(0, 0, 500) //获取文件节点，调用scroll对象中的scrollTo方法回到顶部 
    },*/
    addToCart(){  //添加购物车事件
      //1、获取购物车要展示的商品信息
      //console.log(this.detailInfo)
      const product = {}
      product.title = this.itemInfo.title;       
      product.img = this.topImg[0]  //取出第一张图片作购物车商品展示
      product.desc = this.itemInfo.desc
      product.price = this.itemInfo.lowPrice
      product.iid = this.iid
      //2、将商品添加进购物车里面
      //this.$store.commit("addCart", product) //这种方法也不推荐，这是在index.js中的mutation中加入函数的
      //this.$store.cartList.push(product)  //这里是利用vuex将数据先将数据存储在index.js中
      //以上方法是不行的，保存数据最好在index.js中mutation加入函数
      this.$store.dispatch("addCart", product).then(res=>{
        /*this.show = true
        this.message = res
        setTimeout(() => {
          this.show = false
          this.message = ""
        }, 1500)*/
        //console.log(res)
        this.$toast.show(res, 1500) //弹出弹框，设置时间
      })
      /*this.addCart(product).then(res=>{//两个知识点Promise和mapActions
        console.log(res)
      })*/

    }
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 1;
  background-color: #fff; 
  height: 100vh;
}
.detail-content{
  position: absolute;
  /*height: calc(100%-44px)*/
  top: 44px;
  bottom: 49px;
  overflow: hidden;/*将滚动框外的内容隐藏起来，不要影响导航栏的正常显示*/ 
  /*background-color:white;*/ 
}
</style>