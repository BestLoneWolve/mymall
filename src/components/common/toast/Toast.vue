<template>
  
    <div class="toast" v-show="isShow">{{message}}</div>
  
</template>

<script>
export default {
  name: "Toast",
  props:{
    /*message: {
      type: String,
      default(){
        return ""
      }
    },
    show: {
      type: Boolean,
      default(){
        return false
      }
    }*/
  },
  data(){
    return {
      message: "",
      isShow: false
    }
  },
  methods: {
    show(message, duration=2000){
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ""
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast{
      position: fixed;
      top: 50%;
      left: 50%;
      padding: 8px 10px;
      transform: translate(-50%, -50%);
      color: white;
      background:rgba(0,0,0,.7);
      z-index: 999;
      font-size: 18px;
  }
</style>