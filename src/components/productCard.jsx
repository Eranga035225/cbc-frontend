

export default function ProductCard(props){
  const product = props.product;

  return(

    <div className="card">
      <img className="productImage" src={product.image}/>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <h2>price : ${product.price}</h2>
      <button className="addToCart">Add to cart</button>
      <button className="buyNow">Buy Now</button>

    </div>

  )




}
