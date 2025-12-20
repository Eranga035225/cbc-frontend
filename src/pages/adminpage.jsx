import { Link } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductsPage";


export default function AdminPage(){

return(

  <div className="w-full h-screen flex">
    <div className="h-full w-[300px] flex flex-col">
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/reports">Reports</Link>

    </div>
    <div className="h-full w-[calc(100%-300px)]">
      <Routes path="/*">
        <Route path="/products" element={<ProductsPage />}></Route>
        <Route path="/users" element={<h1>Users</h1>}></Route>
        <Route path="/orders" element={<h1>Orders</h1>}></Route>
        <Route path="/reports" element={<h1>Reports</h1>}></Route>
        <Route path="/add-product" element={<AddProductPage/>}></Route>
        
      </Routes>
    </div>


  </div>
)



}