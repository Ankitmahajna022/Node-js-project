import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const [editMode, setEditMode] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    const body = {
      title,
      dead_line: "",
      status: "Pending",
      description,
    };

    const res = await axios.post("http://localhost:5000/todos", body);
    setTodos([...todos, res.data]);

    setTitle("");
    setDescription("");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleCompleted = async (todo) => {
    const updated = { ...todo, isCompleted: !todo.isCompleted };

    await axios.put(`http://localhost:5000/todos/${todo.id}`, updated);

    setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
  };

  const toggleExpand = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isExpanded: !t.isExpanded } : t
      )
    );
  };

  const saveEdit = async (id) => {
    const updatedTodo = {
      title: editTitle,
      description: editDescription,
    };

    await axios.put(`http://localhost:5000/todos/${id}`, updatedTodo);

    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, ...updatedTodo } : t
      )
    );

    setEditMode(null);
  };

  return (
    <div className="container">
      <h1 className="heading">Todo App</h1>

      <div className="inputBox">
        <input
          className="input"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="addBtn" onClick={addTodo}>
          ➕ Add Todo
        </button>
      </div>


      <div className="todoList">
        {todos.map((t) => (
          <div
            key={t.id}
            className={`todoBox ${t.isCompleted ? "completed" : ""}`}
          >
            <div className="row">
              <span className="title">
                {t.isCompleted ? <s>{t.title}</s> : t.title}
              </span>

              <div>
              
                <button className="smallBtn" onClick={() => toggleCompleted(t)}>
                  {t.isCompleted ? "✔" : "○"}
                </button>

          
                <button className="smallBtn" onClick={() => toggleExpand(t.id)}>
                  ▼
                </button>

  
                <button
                  className="smallBtn"
                  onClick={() => {
                    setEditMode(t.id);
                    setEditTitle(t.title);
                    setEditDescription(t.description);
                  }}
                >
                  ✏
                </button>

                <button className="deleteBtn" onClick={() => deleteTodo(t.id)}>
                  🗑
                </button>
              </div>
            </div>

            {t.isExpanded && (
              <div className="expandedBox">
                <p>
                  <b>Description:</b> {t.description || "No description"}
                </p>
                <p>
                  <b>Status:</b> {t.status}
                </p>

                {editMode === t.id && (
                  <div className="editBox">
                    <input
                      className="input"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <textarea
                      className="textarea"
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(e.target.value)
                      }
                    />

                    <button className="addBtn" onClick={() => saveEdit(t.id)}>
                       Save
                    </button>

                    <button
                      className="deleteBtn"
                      onClick={() => setEditMode(null)}
                    >
                      ✖ Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
