// 导入 express 模块
const express = require('express')
    // 创建 express 的服务器实例
const app = express()
const qs = require('querystring')



// 这是解析表单数据的中间件
app.use((req, res, next) => {
    // 定义中间件具体的业务逻辑
    // 1.定义一个str字符串，专门用来存储客户端发送过来的请求头数据
    let str = ''
        // 2.监听req的data事件
    req.on('data', (chunk) => {
        str += chunk
    })

    req.on('end', () => {
        // 在str中存放的是完整的请求体数据
        console.log(str);
        // 把字符串的请求体数据，解析成对象格式
        const body = qs.parse(str)
        console.log(body);
        req.body = body
        next()
    })

})



app.post('/user', (req, res) => {
    res.send(req.body)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function() {
    console.log('Express server running at http://127.0.0.1')
})