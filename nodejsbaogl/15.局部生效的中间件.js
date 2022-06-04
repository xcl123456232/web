// 导入express模块
const express = require('express')
    // 创建express的服务器实例
const app = express()



// 1.定义中间件函数
const mw = function(req, res, next) {
    console.log('调用了局部生效的中间件');
    next()
}



// 2.创建路由
app.get('/', mw, (req, res) => {
    res.send('Home page.')
})
app.get('/user', (req, res) => {
    res.send('User page.')
})

app.listen(80, () => {
    console.log('http://127.0.0.1')
})