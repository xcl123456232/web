// 导入fs模块
const fs = require('fs')
    // 导入path模块
const path = require('path')


// 定义正则表达式，分别匹配<style></style>和script标签
const regStyle = /<style>[\s\S]*<\/style>/
const regScript = /<script>[\s\S]*<\/script>/


// 调用readFile()方法读取文件
fs.readFile(path.join(__dirname, './files/index.html'), 'utf8', function(err, dataStr) {
    // 读取HTML文件失败
    if (err) return console.log('读取HTML文件失败！' + err.message);
    // 读取文件成功后，调用对应的三个方法，分别解析处css，js，html文件
    console.log('读取文件成功！');
    resolveCss(dataStr)
    resolveJs(dataStr)
    resolveHTML(dataStr)
})


// 定义处理css样式的方法
function resolveCss(htmlStr) {
    // 使用正则提取需要的内容
    const r1 = regStyle.exec(htmlStr)
        // console.log(r1);
        // 将提取处理的样式字符串，进行字符串的replace替换操作
    const newCss = r1[0].replace('<style>', '').replace('</style>', '')
        // 调用fs.writeFile()方法，将提取的样式，写入到clock目录中index.css的文件里面
    fs.writeFile(path.join(__dirname, './clock/index.css'), newCss, function(err) {
        if (err) return console.log('写入文件样式失败！' + err.message);
        console.log('写入样式文件成功！');
    })
}



// 定义处理css样式的方法
function resolveJs(htmlStr) {
    // 使用正则提取需要的内容
    const r1 = regScript.exec(htmlStr)
        // console.log(r1);
        // 将提取处理的样式字符串，进行字符串的replace替换操作
    const newCss = r1[0].replace('<script>', '').replace('</script>', '')
        // 调用fs.writeFile()方法，将提取的样式，写入到clock目录中index.css的文件里面
    fs.writeFile(path.join(__dirname, './clock/index.js'), newCss, function(err) {
        if (err) return console.log('写入文件样式失败！' + err.message);
        console.log('写入JS脚本成功！');
    })
}

// 定义处理HTML结构的方法
function resolveHTML(htmlStr) {
    // 将字符串调用replace方法， 把内嵌的style和script标签替换为外联的link和script标签
    const newHTML = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css"/>')
        .replace(regScript, '<script src="./index.js"></script>')
        // 写入index.html文件
    fs.writeFile(path.join(__dirname, './clock/index.html'), newHTML, function(err) {
        if (err) return console.log('写入HTML文件失败！' + err.message);
        console.log('写入HTML页面成功！');
    })
}