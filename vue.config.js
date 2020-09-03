module.exports={
  configureWebpack: {
    resolve: {
      alias: {
        "assets":'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'view':'@/views'
      }
    }
  }
}
/*const path = require('path')
 
// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}
 
module.exports = {
  
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('./src/components'))
      .set('common', resolve('./src/common'))
      .set('view',resolve('./src/views'))
  }
}*/