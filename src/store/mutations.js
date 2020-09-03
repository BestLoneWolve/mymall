import {ADD_COUNTER, ADD_TO_CART} from "./mutation-types"
export default {
  [ADD_COUNTER](state, payload){
    payload.count += 1
  },
  [ADD_TO_CART](state,payLoad){
    payLoad.checked = true,
    state.cartList.push(payLoad)
  }
}