<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" 
      @click.native="selectAllClick"
      class="check-button"/>
      <span>全选</span> 
    </div>
    <div class="total">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

export default {
  name: "ShopBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){  //计算选中的购物车中的商品的总价格
      return "￥" + this.$store.state.cartList.filter(item=>{
        return item.checked
      }).reduce((preValue, item)=>{
        return preValue+item.price*item.count
      }, 0).toFixed(2)
      //console.log(this.$store.getters.cartList)
    },
    checkLength(){//计算购物车中商品数量
      return this.$store.state.cartList.filter(item=>{
          return item.checked
      }).length
    },
    isSelectAll(){
      //return !(this.$store.state.cartList.filter(item=>!item.checked).length)
      if(this.$store.state.cartList.length == 0) return false//判断购物车里是否有商品
      return !this.$store.state.cartList.find(item=>!item.checked)//判断上是否有没有选中的，有就返回false
    }
  },
  methods:{
    selectAllClick(){
      if(this.isSelectAll){//原本全部选中的状态，改成全部都不选
        this.$store.state.cartList.forEach(item=>item.checked = false)
      }else{  //若是存在没选中状态，则全部变成选中
        this.$store.state.cartList.forEach(item=>item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show("请选择购买的商品", 1500)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background: #eee;
    position: relative;
    bottom: 40px;
    line-height: 40px;
    display: flex;
  }
  .check-button{
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin-right: 5px;
    margin-left: 5px;
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 80px; 
    font-size: 14px;
  }
  .total{
    margin-left: 20px;
    flex: 1;
    font-size: 14px;
  }
  .calculate{
    width: 90px;
    background: red;
    color: white;
    text-align: center;
    font-size: 14px;
  }
</style>