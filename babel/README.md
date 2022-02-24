# Babel的三个主要处理步骤  解析（parse）、转换（transform）、生成（generate）

## 解析步骤接受代码并输出AST，这个步骤分为 词法分析(Lexical Analysis)和语法分析（Syntactic Analysis)

此法分析 把字符串形式的代码转换为令牌（tokens）流，扁平的语法片段数组
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