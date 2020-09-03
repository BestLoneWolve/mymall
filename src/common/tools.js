export function debounce(func,delay){//创建防抖函数
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
  export function formatDate(date, fmt) {
    //1.获取年份
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    //2、获取时间的其他要素
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  };
  function padLeftZero (str) {
    return ('00' + str).substr(str.length);
  };