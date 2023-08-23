export function inArray(arr: any[], elem: any){
  
  for (let i = 0; i < arr.length; i++){
    if (arr[i] === elem) return true
  }
  return false
}