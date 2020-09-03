import {request} from './request';
export function getHomeMultiData(){
  return request({
      url: '/home/multidata'
  })
}
export function getHomeGoods(type,page){
  return request({
    url: '/home/data',
    params: {  //获取url后面的拼接信息?type=type&page=page
      type,
      page
    }
  })
}