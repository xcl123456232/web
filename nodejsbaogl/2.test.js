const ittest = require('./ittest-tools')

// 格式化时间的功能
const dtStr = ittest.dateFormat(new Date())
console.log(dtStr)
console.log('------------------');


const htmlStr = '<h1 title="abc">这是h1标签<span>123&nbsp;</span></h1>'
const str = ittest.htmlEscape(htmlStr)
console.log(str);
console.log('---------------');


const str2 = ittest.htmlUnEscape(str)
console.log(str2);