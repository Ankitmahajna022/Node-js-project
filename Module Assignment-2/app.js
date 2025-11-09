const { subscribe } = require("diagnostics_channel");
const fs=require("fs");


function MyName(){
    console.log("Hello,My Name Is Ankit Mahajan")
}

function add(a, b) {
    console.log(a+b);
}

function subtract(a, b) {
    console.log(a-b);
}

function multiply(a, b) {
    console.log(a*b);
}

function divide(a, b) {
    console.log(a/b)
}

function writeToFile(filename, data) {
    fs.writeFileSync(filename, data, 'utf8');
    console.log(`Data written to ${filename}`);
}

function readFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    console.log(`Data from ${filename}:`);
    console.log(data);
}


function getRandomNumber(min, max) {
    console.log(Math.floor(Math.random() * (max - min + 1)) + min) ;
}



module.exports={
    MyName,
    add,
    subtract,
    multiply,
    divide,
    writeToFile,
    readFromFile,
    getRandomNumber
}