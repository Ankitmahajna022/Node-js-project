import monsgoose from "mongoose"


export const connecDB=()=>{monsgoose.connect("mongodb://localhost:27017/student").then(()=>console.log("server is started...!"))}