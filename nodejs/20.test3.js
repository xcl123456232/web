// 在外界使用require导入一个自定义模块的时候，得到的成员就是
// 那个模块中，通过module.exports指向的那个对象
const m = require('./19.自定义模块')
console.log(m)