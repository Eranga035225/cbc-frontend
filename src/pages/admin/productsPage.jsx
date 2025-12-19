import { sampleProducts } from "../../assets/sampleData";
import { useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll">
      <table className="w-full">
        <thead>
          <tr>
            <th> Product ID </th>
            <th> Name </th>
            <th> Image </th>
            <th> Labelled Price </th>
            <th> Price </th>
            <th> Stock </th>
          </tr>

        </thead>
      </table>
     
    </div>


  );
    
  
}