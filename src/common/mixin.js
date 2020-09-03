import {debounce} from "common/tools"    //引入防抖函数
import BackTop from 'components/content/backTop/BackTop'//引入返回顶部组件
import {POP, SELL, NEW} from "common/const";


export const itemListenerMixin = {  //注意不能用function
    data(){
      return {
        itemImgListener: null
      }
    },
    mounted() {
      //1.图片加载完的事件监听
      const refresh = debounce(this.$refs.scroll.refresh,500)
      //对监听图片加载完成要执行的函数进行保存
      this.itemImgListener = () => { refresh() }//refresh在Scroll.vue中已封装
      //监听goodlistitem中图片加载完成
      this.$bus.$on('itemImgLoad',this.itemImgListener)//采用this.$refs获取节点不要在created中执行，要在mounted中。
    }
  
}
export const backTopMixin = {
  data(){
    return {
      isShow: false
    }
  },
  methods: {
    backClick(){    //点击回到顶部事件
      this.$refs.scroll.scrollTo(0, 0, 500) //获取文件节点，调用scroll对象中的scrollTo方法回到顶部 
    },
    backTopListener(position){
      this.isShow = (-position.y) > 1000  //根据滚动的位置判断是否要显示backtop
    },
  },
    
  components: {
    BackTop
  },
  

}
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}