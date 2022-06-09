/**
 * JSON.parse(JSON.stringify())的缺点
 * 1：不能处理循环引用
 * 2：不能拷贝特殊对象，如RegExp Date Map Set
 * 3：不能处理函数
 */

const deepClone = target => {
  if (typeof target === 'object' && target !== null) {
    const res = Array.isArray(target) ? [] : {}

    for(let item in target) {
      if (target.hasOwnProperty(item)) {
        res[item] = deepClone(target[item])
      }
    }

    return res
  } else {
    return target
  }
}

const isObject = target => (typeof target === 'object' || typeof target === 'function') && target !== null
// 解决循环引用  WeakMap 弱引用
const deepClone1 = (target, map = new WeakMap()) => {
  if (map.get(target)) {
    return target
  }

  if (isObject(target)) {
    map.set(target, true)

    const res = Array.isArray(target) ? [] : {}

    for(let item in target) {
      if (target.hasOwnProperty(item)) {
        res[item] = deepClone1(target[item], map)
      }
    }
    return res
  } else {
    return target
  }
}

const a = {val:2};
a.target = a;
let newA = deepClone1(a);
// console.log(newA)


// 拷贝特殊对象
const canTraverse = {
  '[object Map': true,
  '[object Set': true,
  '[object Array': true,
  '[object Object': true,
  '[object Arguments': true,
}

const deepClone2 = (target, map = new WeakMap()) => {
  if (!isObject(target)) return target

  let type = Object.prototype.toString.call(target)
  const res = Array.isArray(target) ? [] : {}

  if (!canTraverse[type]) {
    return
  } else {
    // 保证对象的原型不丢失
    let ctor = target.prototype
    res = new ctor()
  }

  if (map.get(target)) return target
  map.put(target, true)

  if (type === '[object Map') {
    target.forEach((item, key) => {
      res.set(deepClone2(key), deepClone2(item))
    })
  }箭头

  if (type = 'object Set') {
    target.forEach(item => {
      target.add(deepClone2(item))
    })
  }

  // 处理数组和对象
  for (let item in target) {
    if (target.hasOwnProperty(item)) {
      res[item] = deepClone2(target[item])
    }
  }

  return res
}


var isValid = function(s) {
  // const a = s.split('')
  if (s.length % 2 === 1) return false

  const stack = []
  const map = {
      ')': '(',
      ']': '[',
      '}': '{',
  }

  for(let i of s) {
    console.log('i :>> ', i);
    console.log('map[i] :>> ', map[i]);
    console.log('stack[stack.length - 1] :>> ', stack[stack.length - 1]);
      if (!map[i]) {
          stack.push(i)
      } else if (map[i] === stack[stack.length - 1]) {
          stack.pop()
      }

      console.log('stack :>> ', stack);
  }
  console.log('stack :>> ', stack);
  return !stack.length

  // function deep(a) {
  //     for(let i = 1; i < a.length; i++) {
  //         const b = a[i - 1] 
  //         const c = a[i]
  //         if((b === '(' && c === ')') || (b === '[' && c === ']') || (b === '{' && c === '}')) {
  //             a.splice(i-1,2)
  //             deep(a)
  //         }
  //     }
  // }
  // deep(a)


  // if (a.length) return false
  // return true
};

// isValid("([}}])")

var isPalindrome = function(x) {
  x = x + ''
  const half = Math.floor(x.length / 2)
  const left = x.slice(0,half)
  const right = x.slice(x.length % 2 === 1 ? half + 1 : half, x.length)
  
  for(let i = 0; i < left.length; i++) {
    if (left[i] !== right[right.length - 1 - i]) {
      return false
    }
  }

  return true
};

console.log('isPalindrome(1234567) :>> ', isPalindrome(121));