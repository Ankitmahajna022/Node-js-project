import {BrowserRouter,Route,Routes} from "react-router-dom"
import AddProduct from "./components/AddProduct"

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/addProduct" element={<AddProduct/>} />
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}
