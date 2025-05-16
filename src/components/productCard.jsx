

export default function ProductCard(props){

  return(

    <div className="card">
      <img className="productImage" src={props.image}/>
      <h1>{props.name}</h1>
      <p>{props.description}</p>
      <h2>price : ${props.price}</h2>
      <button className="addToCart">Add to cart</button>
      <button className="buyNow">Buy Now</button>

    </div>

  )




}
