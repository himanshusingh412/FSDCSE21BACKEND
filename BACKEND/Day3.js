//Promises
//Promise way 1
const PromiseOne=new Promise((resolve, reject ) => {
    console.log("promise done")
    
})
promiseOne.then(()=>{
console.log("result");
}).catch((error)=>{
    console.log("error");
})