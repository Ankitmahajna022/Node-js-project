import { MongoClient } from "mongodb";


const client = new MongoClient('mongodb://localhost:27017')

export const connectDB = async () => {

    await client.connect();
    console.log("Connected....")
    const db = client.db("employee's")
    return db
}

export const addEmployee = async () => {

    const db = await connectDB()

    db.collection("employee's").insertOne({
        "name": "Rahul Sharma",
        "employeeId": "EMP001",
        "department": "Sales",
        "position": "Sales Executive",
        "email": "rahul.sharma@example.com",
        "phone": "+91 9876543210",
        "salary": 35000,
        "joiningDate": "2022-06-15",
        "isActive": true
    })
}

addEmployee()
