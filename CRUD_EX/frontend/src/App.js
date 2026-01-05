import {BrowserRouter,Route,Routes} from "react-router-dom"
import AddProduct from "./components/AddProduct"
import ProductList from "./components/ProductList"

export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/addProduct" element={<AddProduct/>} />
      <Route path="/Products" element={<ProductList/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  )
}
