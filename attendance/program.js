// let arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
// let j = arr.length - 1;
// for (let i = 0; i < arr.length / 2; i++) {
//   if (arr[i] != arr[j]) {
//     console.log(arr[j]);
//     console.log(arr[i]);
//   } else {
//     console.log(arr[j]);
//   }
//   j--;
// }

// let arr=[1,2,3,4,6,6];
// arr.sort();
// console.log(arr)

// let dup=0;
// let missing=0;
// for(let i=0;i<arr.length-1;i++){
//     let j=i+1;
//     if(arr[i]==arr[j]){
//         dup=arr[i];
//     }else if(arr[j]-arr[i]!=1){
//         if(missing==0) missing=arr[i]+1;
//     }
// }
// if(missing==0)  missing=arr[0]-1;
// console.log(`Repeating number is ${dup} and smallest positive missing number is ${missing}`)

// function combu(s) {
//   var buff = [];
//   var res = [];
//   for (i = 0; i < s.length; i++) {
//     buff = [s[i]];
//     var index = 0;
//     while (res[index]) {
//       buff.push("" + res[index] + s[i]);
//       index++;
//     }
//     res = res.concat(buff);
//   }
//   return res;
// }

// console.log(combu("abc"));

// let findPermutations = (string) => {
//     if (!string || typeof string !== "string"){
//       return "Please enter a string"
//     } else if (string.length < 2 ){
//       return string
//     }

//     let permutationsArray = []

//     for (let i = 0; i < string.length; i++){
//       let char = string[i]

//       let remainingChars = string.slice(0, i) + string.slice(i + 1, string.length)
//         console.log(remainingChars)
//       for (let permutation of findPermutations(remainingChars)){
//         permutationsArray.push(char + permutation) }
//     }
//     return permutationsArray
//   }
//   console.log(findPermutations('abc'));

// let s = "aman sharma";
// let st = "";
// for (let i = 0; i < s.length - 1; i++) {
//   let count = 1;
//   for (let j = i + 1; j < s.length; j++) {
//     if (!st.includes(s[j])) {
//       if (s[i] == s[j]) {
//         count += 1;
//       }
//     }
//   }

//   if (count > 1) console.log(s[i] + " = " + count);
//   st += s[i];
// }

// let s = "aman sharma";
// let st = "";
// for (let i = 0; i < s.length - 1; i++) {
//   if(!st.includes(s[i])){
//     st+=s[i]
//   }
// }
// console.log(st)

// let s1 = "IndiaUSAEngland";
// let s2 = "USAEnglandIndia";
// let s3 = "IndiaEnglandUSA";
// if (s1.length == s2.length) {
//   s1 += s1;
//   if (s1.includes(s2)) {
//     console.log(true);
//   } else {
//     console.log(false);
//   }
// } else console.log("false");

// function printcomb(s, a) {
//   if (s.length == 0) {
//     //console.log(a + " ");
//     return false;
//   }
//   for (let i = 0; i < s.length; i++) {
//     let t = s[i];
//     let rem = s.substring(0, i) + s.substring(i + 1);
//     console.log(rem)
//     printcomb(rem, a + t);
//   }
// }

// let s = "abc";
// printcomb(s, "");

// let a=[
//     [1,2],[3,4]
// ]
// let b=[
//     [5,6],[7,8]
// ]
// let c=[
//     [1,2],[3,4]
// ]
// for(let i=0;i<2;i++){    
//     for(let j=0;j<2;j++){
//         let sum=0;
//         for (let k=0;k<2;k++ ) {
//             sum+=a[i][k]*b[k][j];
//         }
//         c[i][j]=sum;
//     }
// }
// console.log(c);

