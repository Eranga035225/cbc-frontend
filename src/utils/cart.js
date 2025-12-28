

export function getCart(){
  let cart = localStorage.getItem("cart");
  

  if(cart==null){
    cart = []  //assigns an empty array
    localStorage.setItem("cart", JSON.stringify(cart)); //converts to a string and save in the local storage
  }else{
    cart = JSON.parse(cart);

  }

  return cart




}

//function to add a product

export function addToCart(product,quantity){

  let cart = getCart();

  let index = cart.findIndex((item)=> {
    return item.productId == product.productId
  })

  if(index == -1){
    cart[cart.length] = {
      productId: product.productId,
      name: product.name,
      image: product.images[0],
      price: product.price,
      labeledPrice: product.labeledPrice, 
      quantity: quantity

    }
  }else{
    const newQuantity = cart[index].quantity + quantity;
    if(newQuantity <= 0 ){
      removeFromCart(product.productId);
      return;

    
    }else{
      cart[index].quantity = newQuantity;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));




}


//function to remove item from cart
export function removeFromCart(productId){
  let cart = getCart();
  const newCart = cart.filter(
    (item)=> {
      return item.productId != productId
    }

  );
  localStorage.setItem("cart", JSON.stringify(newCart));

}


