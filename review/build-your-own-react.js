// 这不是合法的js代码，因此需要将其转换为合法的js代码 => babel
const elementJSX = <h1 title='foo'>Hello</h1>

// element是一个代用type和props的对象， createElement函数就是创建这样一个对象
// const element = React.createElement(
//   'h1',
//   { title: 'foo' },
//   'Hello'
// )

// children使用 ...（剩余参数） 确保 children为一个数组
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => 
        // children数组中可能有像string number这样的基本值
        typeof child === 'object' ? child : createTextNode(child)  
      )
    }
  }
}

// react对于一个基本值的子元素，不会创建空数组也不会包一层TEXT_ELEMENT 这里是为了简化代码
function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

// function render(element, container) {
  // const dom = element.type === 'TEXT_ELEMENT' 
  //   ? document.createTextNode('') : document.createElement(element.type)

  // const isProperty = key => key !== 'children'

  // // 将element中的属性赋值给node
  // Object.keys(element.props)
  //   .filter(isProperty)
  //   .forEach(name => {
  //     dom[name] = element.props[name]
  //   })

  // element.props.children.forEach(child => (
  //   render(child, dom)
  // ))

  // container.appendChild(dom)
// }

function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' 
    ? document.createTextNode('') : document.createElement(fiber.type)
  const isProperty = key => key !== 'children'

  Object.keys(fiber.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = fiber.props[name]
    })
  
  return dom
}

function render(element, container) {
  wipRoot = {
    dom: container,
    props: {
      child: [element]
    },
    alternate: currentRoot // 记录旧fiber节点
  }
  // nextUnitOfWork = {
  //   dom: container,
  //   prompt: {
  //     children: [element]
  //   }
  // }
  deletions = []
  nextUnitOfWork = wipRoot
}

let nextUnitOfWork = null
// workInProgressRoot 把修改DOM这部分内容记录在fiber树上
// 一旦完成wipRoot这棵树上的所有任务，就把整棵树的变更提交到实际的DOM上
let wipRoot = null 
// 保存上次提交到DOM节点的fiber树的引用
let currentRoot = null
let deletions = null

function commitRoot() {
  deletions.forEach(commitWork)
  commitWork(wipRoot.child)
  currentRoot = wipRoot
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) return

  // const domParent = fiber.parent.dom
  const domParentFiber = fiber.parent
  while(!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent
  }
  const domParent = domParentFiber.dom

  if (fiber.effectTag === 'PLACEMENT' && fiber.dom !== null) {
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'DELETION') {
    domParent.removeChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE' && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  }
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prev, next) => key => {
  prev[key] !== next[key]
}
const isGone = (prev, next) => key => !(key in next)
const isEvent = key => key.startWith('on')

function updateDom(dom, prevProps, nextProps) {
  // remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key => !(key in nextProps) || isNew(prevProps, nextProps)(key)
    )
    .forEach(name => {
      const eventType = name.toLowerCase.substring(2)
      // 移出旧的事件
      dom.removeEventListener(eventType, prevProps[name])
    })
  // add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2)

      dom.addEventListener(eventType, nextProps[name])
    })
  // remove old properties  
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = ''
    })
  // set new or change properties
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name]
    })
}

// 遍历element是没法暂停的，如果这棵树很大，可能会对主线程进行阻塞。
// 这意味着浏览器的一些高优先级任务会一直等待渲染完成，如用户输入，保证动画顺畅
// 不需要将整个任务分成一些小块，每当完成其中一块之后需要把控制权交给浏览器，
// 让浏览器判断是否有更高优先级的任务需要完成
function workLoop(deadline) {
  let shouleYield = false

  while(nextUnitOfWork && !shouleYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)

    shouldYield = deadline.timeRemaining() < 1
  }

  requestIdleCallback(workLoop)
}
// 浏览器会在主线程有空闲是的时候运行
// callback 一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 
// IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
requestIdleCallback(workLoop)

// 不仅需要执行每一小块的任务单元 还需要返回下一个任务单元
function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function

  if (isFunctionComponent) {
    updateFunctionComponent(fiber)
  } else {
    updateHostComponent(fiber)
  }
  if(!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  // 一边遍历element，一边生成新的DOM节点并且添加到其父节点上。在完成整棵树的渲染前
  // 用户可能看到渲染未完成的UI,避免这种情况，将修改DOM节点单独移出
  // if(fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom)
  // }

  const elements = fiber.props.children

  reconcileChildren(fiber, elements)



  // 最后找到下一个工作单元 child sibling parent
  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while(nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    } 
    nextFiber = nextFiber.parent
  }
}
// workInProgress 当前fiber
let wipFiber = null 
let hookIndex = null

// 函数组件的fiber没有DOM节点
// 子节点由函数运行得来而不是直接从props属性中获取
function updateFunctionComponent(fiber) {
  wipFiber = fiber
  hookIndex = 0 // 当前hook的序号
  wipFiber.hooks = [] // 数组 以支持我们在同一个函数组件中多次调用useState
  // 例如这里的fiber.type是App函数，运行这个函数会返回element
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)
}

function useState(initial) {
  // 当函数组件调用useState，我们校验fiber对应的alternate字段下的旧fiber
  // 是否存在旧hook，hook的序号用以记录是该组件下的第几个useState
  // 如果存在旧hook，将旧hook的值拷贝一份到新的hook，如果不存在则将state初始化
  const oldHook = wipFiber.alternate
    && wipFiber.alternate.hooks
    && wipFiber.alternate.hooks[hookIndex]
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  }

  const actions = oldHook ? oldHook.queue : []

  actions.forEach(action => {
    hook.state = action(hook.state)
  })

  const setState = action => {
    hook.queue.push(action)
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    }
    nextUnitOfWork = wipRoot
    deletions = []
  }

  // 然后再fiber上添加新hook 自增hook序号 返回状态
  wipFiber.hooks.push(hook)
  hookIndex++
  return [hook.state, setState]
}

function updateHostComponent(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  reconcileChildren(fiber, fiber.props.children)
}

function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child
  let prevSibling = null

  while(index < elements.length || oldFiber != null) {
    const element = elements[index]
    // const newFiber = {
    //   type: element.type,
    //   props: element.props,
    //   parent: wipFiber,
    //   dom: null
    // }
    const newFiber = null

    const sameType = oldFiber && element && element.type == oldFiber.type

    // react使用key这个属性来优化reconciliation过程 例如key属性可以用来检测
    // elements数组中的子组件是否仅仅是更换了位置
    // update 可以服用DOM 仅更改上面的属性
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: 'UPDATE' // commit中用到
      }
    }

    // 类型不同需要新建DOM节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: 'PLACEMENT'
      }
    }

    // delete
    if (oldFiber && !sameType) {
      newFiber.effectTag = 'DELETE'
      deletions.push(oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (index === 0) {
      wipFiber.child = newFiber
    } else {
      prevSibling.sibling = newFiber
    }

    prevSibling = newFiber
    index++
  }
}

const Didact = {
  createElement,
  render
}

// const element = {
//   type: 'h1',
//   props: {
//     title: 'foo',
//     children: 'Hello'
//   }
// }

// const element = Didact.createElement(
//   'div',
//   { id: 'foo' },
//   Didact.createElement('a', null, 'bar'),
//   Didact.createElement('b')
// )

// const node = document.createElement(element.type)
// node['title'] = element.props.title

// const text = document.createTextNode('')
// text['nodeValue'] = element.props.children

// const container = document.getElementById('root')

// node.appendChild(text)
// container.appendChild(node)
// ReactDOM.render(element, container)

/** @jsx Didact.createElement */
const element = (
  <div id='foo'>
    <a>bar</a>
    <b />
  </div>
)

const container = document.getElementById('root')
Didact.render(element, container)
