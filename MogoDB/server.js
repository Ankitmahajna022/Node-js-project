import express from "express";
import { addUser, readUser, deleteUser, updateUser } from "./mongoDB_Driver";

const app = express();
app.use(express.json());


app.get("/api", async (req, res) => {
  const { id, role, name } = req.query;

  let query = {};

  if (id) query.customer_id = Number(id);
  if (role) query.role = role;
  if (name) query.name = { $regex: name, $options: "i" }; // i = case insensitive

  const customers = await readUser(query);
  res.json(customers);
});

app.post("/api", async (req, res) => {
  const customer = req.body;
  const result = await addUser(customer);
  res.json(result);
});

app.put("/api/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;
  const result = await updateUser(id, data);
  res.json(result);
});
app.delete("/api/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await deleteUser(id);
  res.json(result);
});


app.listen(4000, () => {
  console.log("Server started on port 4000...");
});
