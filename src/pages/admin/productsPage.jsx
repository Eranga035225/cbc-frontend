import { sampleProducts } from "../../assets/sampleData";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState(sampleProducts);

  useEffect(
    ()=> {
    axios.get(import.meta.env.VITE_BACKEND_URI + "/api/products").then((response) => {
    setProducts(response.data.products); 
  })

    }, []
  );
  
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
          {
            products.map(
              (item, index)=> {
                return(
                  <tr key={index}>
                    <td> {item.productId} </td>
                    <td> {item.name} </td>
                    <td> <img className="productImage w-[50px] h-[50px]" src={item.images[0]}/></td>
                    <td> {item.labeledPrice} </td>
                    <td> {item.price} </td>
                    <td> {item.stock} </td>
                   


                  </tr>

                );
               
              }
            )




          }

        </tbody>
      </table>
     
    </div>


  );
    
  
}