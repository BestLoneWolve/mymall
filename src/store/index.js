import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getter"

//1、安装插件
Vue.use(Vuex)

//2、创建Store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  /*mutations: {
    //mutations唯一目的是修改state中的值
    //mutations中的每个方法尽可能完成的事件比较单一一点
    //mutation的主要作用就是跟踪数据的改变
    /*addCart(state, payLoad){
        //state.cartList.push(payLoad)
        let oldProduct = state.cartList.find(item => item.iid === payLoad.iid)
        if(oldProduct){
            oldProduct.count += 1
        }else{
            payLoad.count = 1
            state.cartList.push(payLoad)
        }
      } //这是一种保存数据的方法
      addCounter(state, payload){
        payload.count += 1
      },
      addCart(state,payLoad){
        state.cartList.push(payLoad)
      }
  },*/
  
  /*actions:{
    addCart(context, payLoad){
        //state.cartList.push(payLoad)
        let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
        if(oldProduct){
            //oldProduct.count += 1
            context.commit("addCounter", oldProduct)
        }else{
            payLoad.count = 1
            //context.state.cartList.push(payLoad)
            context.commit("addCart", payLoad)
        }
      }
  }*/  
})


//挂载到vue实例上
export default store