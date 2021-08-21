
const webpack = require('webpack');

const SCRIPT_ENV = process.env.SCRIPT_ENV || 'dev';
let apiProxy = 'https://www.baidu.com';
if (SCRIPT_ENV === 'dev') {
    apiProxy = 'https://www.baidu.com';
} else if (SCRIPT_ENV === 'live') {
    apiProxy = 'https://www.sina.com';
}
module.exports = {
    publicPath: './',  //基本路径
    outputDir: 'dist', //构建时的输出目录
    assetsDir: 'static',//放置静态资源的目录
    indexPath: 'index.html',//html 的输出路径
    filenameHashing: true,//文件名哈希值
    lintOnSave: true,//是否在保存的时候使用 `eslint-loader` 进行检查。
    runtimeCompiler: false,

    transpileDependencies: [],//babel-loader 默认会跳过 node_modules 依赖。
    productionSourceMap: false,//是否为生产环境构建生成 source map？
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 75, // 换算的基数(设计图750的根字体为75,如果设计图为640:则rootValue=64)
                        propList: ['*']
                    })
                ]
            }
        }
    },
    devServer: {
        open: true, //编译后默认打开浏览器
        host: '0.0.0.0',  //域名
        port: 8080,  // 端口
        https: false,  //是否https
        //显示警告和错误
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '^/api': {
                target: apiProxy,
                changeOrigin: true
            },

        }
    },
    chainWebpack: (config) => {
        console.log(process.env.SCRIPT_ENV)
        config.plugin('define').tap((args) => {
            args[0]['process.env'].SCRIPT_ENV = JSON.stringify(process.env.SCRIPT_ENV)
            return args
        })
    },
    configureWebpack: (config) => {

    },


}