import addition from "./addition";
let s = new Array(100000).fill(9).join('');
console.time()
addition(s,s);
console.timeEnd();
console.time()
addition(s,s);
console.timeEnd();
// console.log(addition('0,1','0.2'))