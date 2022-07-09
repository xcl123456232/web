// 导入数据库模块
const db = require('../db/index')
const bcrypt = require('bcryptjs')
    // 用这个包来生成Token字符串
const jwt = require('jsonwebtoken')
    // 秘钥
const config = require('../config')
exports.regUser = (req, res) => {
    // 接受表单数据
    const userinfo = req.body
        // 判断数据是否合法
        // if (!userinfo.username || !userinfo.password) {
        //     return res.send({ status: 1, message: '用户名或密码不能为空！' })
        // }
        // 定义sql语句,查询用户名是否被占用
    const sql = 'select * from ev_user where username=?'
    db.query(sql, [userinfo.username], function(err, results) {
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        const sqlStr = 'insert into ev_user set ?'
            //  对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        db.query(sqlStr, { username: userinfo.username, password: userinfo.password }, function(err, results) {
            // 执行SQL语句失败
            // if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)
                // SQL语句执行成功，但影响行数不为1
            if (results.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试!' })
                if (err) return res.cc('注册用户失败，请稍后再试!')
            }
            // res.send({ status: 0, message: '注册成功！' })
            res.cc('注册成功！', 0)
        })
    })

}

exports.login = (req, res) => {
    // 接受表单数据
    const userinfo = req.body
    const sql = `select * from ev_user where username=?`
    db.query(sql, userinfo.username, function(err, results) {
        // 执行SQL语句失败
        if (err) return res.cc(err)
            // 执行SQL语句成功，但是查询到数据条数不等于1
        if (results.length !== 1) return res.cc('登录失败！')
            // TODO：判断用户输入的登录密码和数据库中的密码一致
            // 拿着用户的密码。和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
            // 如果对比的结果等于false，则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码错误，登录失败！')
        }
        //TODO： 登录成功生成Token字符串
        // 注意：在生成Token字符串的时候，一定要剔除密码和头像的值
        // 剔除完毕之后，user只保留了用户的id，username，nickname，email的值
        const user = {...results[0], password: '', user_pic: '' }

        // 生成Token字符串
        const tokenStr = jwt.sign(
            user, config.jwtSecretKey, { expiresIn: '10h' }
            // token有效期为10个小时
        )

        // 将生成的Token字符串响应给客户端
        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + tokenStr,
        })

    })
}