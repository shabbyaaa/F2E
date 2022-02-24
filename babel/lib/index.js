"use strict";

var _babylon = require("babylon");

var babylon = _interopRequireWildcard(_babylon);

var _babelTraverse = require("babel-traverse");

var _babelTraverse2 = _interopRequireDefault(_babelTraverse);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// console.log('hello world')

var MyVisitor = {
  Identifier: function Identifier() {
    console.log('Called!');
  }
};

var visitor = {};
visitor.MemberExpression = function () {};
visitor.FunctionDeclaration = function () {};

function square(n) {
  return n * n;
}

// path.traverse(MyVisitor)


console.log('traverse: ', _babelTraverse2.default);


var code = "function square(n) {\n  return n * n;\n}";

var ast = babylon.parse(code);

_babelTraverse2.default.default(ast, {
  enter: function enter(path) {
    // if (
    //   path.node.type === "Identifier" &&
    //   path.node.name === "n"
    // ) {
    //   path.node.name = "x";
    // }
    if (t.isIndentifier(path.node, { name: 'n' })) {
      path.node.name = 'x';
    }
  }
});