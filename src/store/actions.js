import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types"
export default{
    addCart(context, payLoad){
      return new Promise((resolve, reject)=>{
        //state.cartList.push(payLoad)
        let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
        if(oldProduct){
            //oldProduct.count += 1
            context.commit(ADD_COUNTER, oldProduct)
            resolve("+1")
        }else{
            payLoad.count = 1
            //context.state.cartList.push(payLoad)
            context.commit(ADD_TO_CART, payLoad)
            resolve("添加新商品")
        }
      })
    }
}