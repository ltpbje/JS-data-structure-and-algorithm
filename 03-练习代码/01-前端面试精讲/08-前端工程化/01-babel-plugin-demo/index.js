// 此文件, 就是我们写的插件
// 引入babel-types库，用于创建和操作Babel的抽象语法树（AST）节点
const t = require('babel-types');


// visitor中, 可以存放对于不同抽象语法树的处理规则
const visitor = {
  // 这个函数, 用于处理二进制运算
  BinaryExpression(path) {
    // 获取当前节点
    const node = path.node;

    // 初始化结果变量
    let result;

    // 判断表达式两边是否都是数字字面量
    if (t.isNumericLiteral(node.left) && t.isNumericLiteral(node.right)) {
      // 根据不同的操作符作运算 
      switch (node.operator) {
        case "+":
          // 加法运算
          result = node.left.value + node.right.value;
          break;
        case "-":
          // 减法运算
          result = node.left.value - node.right.value;
          break;
        case "*":
          // 乘法运算
          result = node.left.value * node.right.value;
          break;
        case "/":
          // 除法运算
          result = node.left.value / node.right.value;
          break;
        default:
          break;
      }
    }

    // 如果上⾯的运算有结果的话 
    if (result !== undefined) {
      // 把表达式节点替换成number字⾯量 
      path.replaceWith(t.numericLiteral(result)); // 将计算完的结果, 替换成功了一个节点

      // 但是没有算完, 需要拿着替换后的整个节点, 继续计算
      let parentPath = path.parentPath;
      // 递归调用时, 如果希望this保持不变, 就可以 call 一下
      parentPath && visitor.BinaryExpression.call(this, parentPath);
    }
  }
};

module.exports = function (babel) {
  return {
    visitor // 返回visitor对象，包含对抽象语法树的处理规则
  };
};
