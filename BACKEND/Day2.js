//Synchronous and Asynchronous programming in js
//Synchronous progranmming:code is executed line by line
 /* console.log("JAva Script");
function hello(){
    console.log("Hello World");
}
hello();
console.log("This is synchronous programming"); 

//Asynchronous programming:code is executed line by line but some code is executed after some time
//SetTimeout():function that is used to execute a function after a specified time
const hello = () => {
    setTimeout(() => {
        console.log("Hello World");
    }, 2000);
}
console.log("This is asynchronous programming");

//callback, promises, async/await 
function add(n1, n2, callback) {
    console.log(n1 + n2);
    callback();
}
let a=10;
let b=20;
add(a, b, sayHi);
add(a, b, hello);
add(hello, sayHi);
function sayHi(){
    console.log("This is callback function");
}
function hello(){
    console.log("Hello World"); 
} */

    //create a function display(callback) that print "Welcome to ABES",then call callback which print learning  "FSD in cse21"
function display(callback){
    console.log("Welcome to ABES");
    callback();
}
function learning(){
    console.log("Learning FSD in CSE21");
}
display(learning);