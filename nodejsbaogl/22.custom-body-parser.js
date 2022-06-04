const qs = require('querystring')
const bodyParser = (req, res, next) => {
    // 定义中间件具体的业务逻辑
    // 1.定义一个str字符串，专门用来存储客户端发送过来的请求头数据
    let str = ''
        // 2件.监听req的data事
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
}
module.exports = bodyParser