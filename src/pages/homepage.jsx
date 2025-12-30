import Header from "../components/header";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./client/productPage";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckOutPage from "./client/checkout";
import SearchProductPage from "./client/searchProducts";
import Home from "./client/home";


export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col items-center ">
      <Header />
      <div className="w-full h-[calc(100vh-72px)] flex flex-col items-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/search" element={<SearchProductPage />} />
            <Route path="/about" element={<h1> About </h1>} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/contact" element={<h1> Contact </h1>} />
            <Route path="/overview/:id" element={<ProductOverviewPage />} />
            <Route path="/*" element={<h1>NotFound </h1>}/>





          </Routes> 
      </div>

    </div>
  )
  
}