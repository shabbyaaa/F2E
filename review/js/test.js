// var threeSumClosest = function(nums, target) {
//   let len = nums.length, min = Infinity

//   for(let i = 0; i < len - 3; i++) {
//     for (let j = i + 1; j < len - 2; j++) {
//       for (let k = j + 1; k < len - 1; k++) {
//         const res = nums[i] + nums[j] + nums[k]
//         console.log('res :>> ', res);
//         min = target - res > target - min ? min : res

//         console.log('min :>> ', min);
//       }
//     }
//   }

//   return min
// };

// console.log('res :>> ', threeSumClosest([-1,2,1,-4,0], 1));


var findNumberIn2DArray = function(matrix, target) {
  let len = matrix.length
  if (len === 0) return false


  for(let i = 0; i < len; i++) {
    let left = 0
      let right = matrix[i].length - 1
      
      let arr = matrix[i]
      
      while(left < right) {
        let mid = Math.ceil((left + right) / 2)
        // console.log('left :>> ', left);
        // console.log('right :>> ', right);
        // console.log('mid :>> ', mid);
        // console.log('mid :>> ', mid);
          if (arr[mid] < target) {
              left = mid 
          } else if (arr[mid] === target) {
              return true
          } else if(arr[mid] > target) {
              right = mid - 1
              // console.log('right :>> ', right);
          }
      }
      console.log('left :>> ', left);
      console.log('arr[left] :>> ', arr[left]);
      if(arr[left] > target) {
          return false
      }
      if (arr[left] === target) return true
  }

  return false
};

const a = [
  [1 ,2 , 3, 4, 5],
  [6 , 7, 8, 9,10],
  [11,12,13,14,15],
  [16,17,18,19,20],
  [21,22,23,24,25]
]

console.log('object :>> ', findNumberIn2DArray(a, 19));
