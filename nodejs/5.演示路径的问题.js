const fs = require('fs')


// 出现路径拼接错误，是因为提供了./或者../开头的相对路径
// 如果要解决这个问题，可以直接提供一个完整的文件存放路径就行
// 虽然能找到当前文件的路径，但是读取文件的路径是根据cd的路径和读取文件的相对路径匹配的
// fs.readFile('./files/1.txt', 'utf8', function(err, dataStr) {
//     if (err) {
//         return console.log('读取文件失败' + err.message);
//     }
//     console.log('读取文件成功！' + dataStr);
// })

// 移植性差不利于维护
/* fs.readFile('C:\\Users\\34202\\Desktop\\前端学习\\nodejs\\files\\1.txt', 'utf8', function(err, dataStr) {
    if (err) {
        return console.log('读取文件失败！' + err.message);
    }
    console.log('读取文件成功！' + dataStr);
}) */

// __dirname表示当前文件所处的目录
// console.log(__dirname);



fs.readFile(__dirname + './files/1.txt', 'utf8', function(err, dataStr) {
    if (err) {
        return console.log('读取文件失败' + err.message);
    }
    console.log('读取文件成功！' + dataStr);
})