// console.log('hello world')

const MyVisitor = {
  Identifier() {
    console.log('Called!')
  }
}

let visitor = {}
visitor.MemberExpression = function() {}
visitor.FunctionDeclaration = function() {}

function square(n) {
  return n * n
}

// path.traverse(MyVisitor)


import * as babylon from "babylon";
import traverse from "babel-traverse";
// console.log('traverse: ', traverse);
import * as t from 'babel-types'
console.log('t: ', t.isIdentifier);

const code = `function square(n) {
  return n * n;
}`;

const ast = babylon.parse(code);

traverse.default(ast, {
  enter(path) {
    // if (
    //   path.node.type === "Identifier" &&
    //   path.node.name === "n"
    // ) {
    //   path.node.name = "x";
    // }
    if (t.isIndentifier(path.node, { name: 'n' })) {
      path.node.name = 'x'
    }
  }
});