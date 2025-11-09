const {MyName,add,subtract,multiply,divide,writeToFile,readFromFile,getRandomNumber}=require("./app")

MyName()

add(5,6)
subtract(7,5)
multiply(23,2)
divide(20,2)
getRandomNumber(1, 100)

const filename = 'data.txt';
const content = "Hello Ankit, welcome to Node.js module practice!";

writeToFile(filename, content);
if (checkFileExists(filename)) {
    readFromFile(filename);
}

