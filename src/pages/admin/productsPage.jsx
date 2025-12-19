import { sampleProducts } from "../../assets/sampleData";
import { useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);

  return (
    <div className="w-full h-full bg-red-400 max-h-full overflow-y-scroll">
      <table>
        <thead>
          <tr>
            <th> Product Image </th>
            <th> Product Name </th>
            <th> Product Description </th>
            <th> Product Price </th>
            <th> Actions </th>
          </tr>

        </thead>
      </table>
     
    </div>


  );
    
  
}