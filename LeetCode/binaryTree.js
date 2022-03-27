// 二叉树深度优先遍历
// 前序遍历： 144.二叉树的前序遍历
// 后序遍历： 145.二叉树的后序遍历
// 中序遍历： 94.二叉树的中序遍历
// 二叉树广度优先遍历
// 层序遍历：102.二叉树的层序遍历


// 迭代法

// 中序
function inorderTraversal (root) {
  const res = null

  if (root === null) return res
  
  const stack = []
  let temp = root

  while (temp) {
    stack.push(temp)
    temp = temp.left
  }

  while (stack.length) {
    const target = stack.pop()

    res.push(target)

    if (target.right) {
      let temp2 = target.right
      while (temp2) {
        stack.push(temp2)
        temp2 = temp2.left
      }
    }
  }

  return res
}

function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// pop push  迭代     前序
function A (root) {
  const res = []

  if (root === null) return res

  const stack = [root]

  while (stack.length) {
    const cur = stack.pop()
    res.push(cur.val)

    if (cur.right) {
      stack.push(cur.right)
    }

    if (cur.left) {
      stack.push(cur.left)
    }
  }
  return res
}

// 中序
function B (root) { 
  const res = []

  if (root === null) return res

  const stack = []
  let temp = root

  // 左边子节点入栈
  while (temp) {
    stack.push(temp)
    temp = temp.left
  }

  while (stack.length) {
    const cur = stack.pop()
    
    res.push(cur.val)

    if (cur.right) {
      let temp1 = cur.right

      while (temp1) {
        stack.push(temp1)
        temp1 = temp1.left
      }
    }

  }

  return res
}

// 后序
function B (root) { 
  const res = []

  if (root === null) return res

  const stack = []
  let temp = root

  // 左边子节点入栈
  while (temp) {
    stack.push(temp)
    temp = temp.left
  }

  let p = null // 标识出栈的元素
  while (stack.length) {
    // const cur = stack.pop()
    const top = stack[stack.length - 1]

    if (top.right === null) {
      res.push(top.val)
      p = stack.pop()
    } else {
      if (p !== top.right) {
        let temp1 = cur.right

        while (temp1) {
          stack.push(temp1)
          temp1 = temp1.left
        }
      } else {
        res.push(top.val)
        p = stack.pop()
      }
    }
  }

  return res
}
let count  =1

// 队列 push  shift 广度优先遍历 层序遍历
function D (root) {
  const queue = [root]
  const res = []

  while (queue.length) {
    // 当前层的所有元素
    const cur = [] 
    const len = queue.length

    for (i = 0; i < len; i++) {
      const target = queue.shift()
      cur.push(target.val)

      if (target.left) {
        queue.push(target.left)
      }

      if (target.right) {
        queue.push(target.right)
      }
    }

    res.unshift(cur[cur.length - 1])
  }

  return res.revert()
}