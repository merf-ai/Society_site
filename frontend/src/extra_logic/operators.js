export function inArray(arr, elem){
  
  for (let i = 0; i < arr.length; i++){
    if (arr[i] === elem) return true
  }
  return false
}