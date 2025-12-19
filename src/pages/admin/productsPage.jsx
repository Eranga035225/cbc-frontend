import { sampleProducts } from "../../assets/sampleData";
import { useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll">
      <table className="w-full text-center">
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
        <tbody>
          <tr>
            <td> 1 </td>
            <td> Sample Product 1 </td>
            <td>
              <img src={products[0].images} className="w-[50px] h-[50px] "/>
            </td>
            <td> {products[0].labeledPrice} </td>
            <td> {products[0].price} </td>
            <td> {products[0].stock} </td>
          </tr>
          <tr>
            <td> 2 </td>
            <td> Sample Product 2 </td>
            <td>
              <img src={products[1].images} className="w-[50px] h-[50px] "/>
            </td>
            <td> {products[1].labeledPrice} </td>
            <td> {products[1].price} </td>
            <td> {products[1].stock} </td>
          </tr>

        </tbody>
      </table>
     
    </div>


  );
    
  
}