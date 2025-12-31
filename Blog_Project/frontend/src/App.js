// App.jsx
import { RouterProvider, createBrowserRouter, Navigate} from "react-router-dom";
import Home from "./page/Home";
import CreateBlog from "./page/CreateBlog";
import EditBlog from "./page/EditBlog";
import Login from "./page/Login";
import Register from "./page/Register";
import Layout from "./components/Layout";

// PrivateRoute component
function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token"); // check if user is logged in
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/create", element: <PrivateRoute><CreateBlog /></PrivateRoute> },
      { path: "/edit/:id", element: <PrivateRoute><EditBlog /></PrivateRoute> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <div style={{ textAlign: "center", marginTop: 50 }}><h2>404 - Page Not Found</h2></div> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
