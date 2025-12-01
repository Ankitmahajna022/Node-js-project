import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017/");

export const connectDB = async () => {
  await client.connect();
  console.log("Connected to MongoDB...");
  return client.db("employeesDB");
};

export const addUser = async (user) => {
  const db = await connectDB();
  return await db.collection("customers").insertOne(user);
};

export const readUser = async (query = {}) => {
  const db = await connectDB();
  return await db.collection("customers").find(query).toArray();
};

export const updateUser = async (id, data) => {
  const db = await connectDB();
  return await db.collection("customers").updateOne(
    { customer_id: id },
    { $set: data }
  );
};

export const deleteUser = async (id) => {
  const db = await connectDB();
  return await db.collection("customers").deleteOne({ customer_id: id });
};
