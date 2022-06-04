const express = require('express')
    // 创建 express 的服务器实例
const app = express()
    // 1. 定义路由
app.get('/', (req, res) => {
    // 1.1人为的制造错误
    throw new Error('服务器内部发生了错误！')
        // 不会返回给客户端信息
    res.send('Home page.')
})

// 2.定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的奔溃
app.use((err, req, res, next) => {
    console.log('发生了错误！' + err.message);
    res.send('Error' + err.message)
})

app.listen(80, function() {
    console.log('Express server running at http://127.0.0.1');
})