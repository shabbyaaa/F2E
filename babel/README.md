# <https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/README.md>

# Babel的三个主要处理步骤  解析（parse）、转换（transform）、生成（generate）

## 解析步骤接受代码并输出AST，这个步骤分为 词法分析(Lexical Analysis)和语法分析（Syntactic Analysis)

### 词法分析
词法分析 把字符串形式的代码转换为令牌（tokens）流，扁平的语法片段数组 
和AST节点一样他们也有 start、end、loc属性  记录该节点在原始代码中的位置
```json
{
  "type": {
    "label": "function",
    "keyword": "function",
    "beforeExpr": false,
    "startsExpr": true,
    "rightAssociative": false,
    "isLoop": false,
    "isAssign": false,
    "prefix": false,
    "postfix": false,
    "binop": null
  },
  "value": "function",
  "start": 0,
  "end": 8,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 8
    }
  }
}
```

### 语法分析
语法分析会把一个令牌流转换成AST的形式，这个阶段会使用令牌中的信息把它们转换成一个AST的表述结构，方便后续操作

## 转换 transform
转换步骤接收AST并对其进行遍历，在此过程中对节点进行添加。更新及移除等操作，这是Babel或是其他编译器中最复杂的过程 同时也是插件将要介入工作的部分。

## 生成 generate
代码生成步骤把最终的（经过一系列转换之后）AST转换成字符串形式的代码，溶蚀还会创建源码隐射（source maps）
代码生产其实很简单，深度优先遍历整个AST，然后构建可以表示转换后的代码的字符串