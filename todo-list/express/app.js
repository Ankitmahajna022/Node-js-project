import express from "express";
import cors from "cors";

const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

let todos = [];

// Get All Todos
app.get("/todos", (req, res) => {
    const { status } = req.query;

    if (status) {
        return res.json(todos.filter(t => t.status === status));
    }

    res.json(todos);
});

// Add Todo
app.post("/todos", (req, res) => {
    const todo = {
        id: Date.now(),
        title: req.body.title,
        dead_line: req.body.dead_line,
        isCompleted: false,
        isExpanded: false,
        status: req.body.status,
        date: new Date().toISOString().split("T")[0],   // FIXED
        time: new Date().toLocaleTimeString(),          // FIXED
        description: req.body.description
    };

    todos.push(todo);
    res.json(todo);
});

// Delete Todo  (FIXED ROUTE)
app.delete("/todos/:id", (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.json({ success: true });
});

app.put("/todos/:id", (req, res) => {
    todos = todos.map(t => 
        t.id == req.params.id ? { ...t, ...req.body } : t
    );
    res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on port 5000"));
