
let n = prompt("The number of values in  the array: ");
let arr=[];

for (let i =1;i <=n;i++) {
    arr[i-1] =i;
    
}
console.log(arr);

let sum =arr.reduce((res,cur) => {// this funciton is to add n numbers
      
    return res + cur;
});
console.log(sum);

let mul =arr.reduce((res,cur) => {// this funciton is to multiple n numbers
      
    return res * cur;
});
console.log(mul);


