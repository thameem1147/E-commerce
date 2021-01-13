import React from "react";
import Products from "./components/products/Products";
import Navbar from "./components/navbar/Navbar";
import { commerce } from "./lib/commerce";
import { useState, useEffect } from "react";
import Cart from "./components/cart/Cart";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/checkoutform/checkout/Checkout";



const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  
  const fetchProducts = async () =>
  {
    const { data } = await commerce.products.list();
    setProducts(data);
  }
   const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
   }
 const handleCart = async (productId, quantity) =>
 {
   const { cart } = await commerce.cart.add( productId, quantity );
   setCart(cart);
 }
 const handelUpdateCartQuantity = async (productId, quantity) =>
 {
   const { cart } = await commerce.cart.update(productId,{quantity});
   setCart(cart);
 }

 const handleRemoveFromCart = async (productId) => {
   const { cart } = await commerce.cart.remove(productId);
   setCart(cart);
 }
 const handleEmptyCart = async () =>
 {
   const { cart } = await commerce.cart.empty();
   setCart(cart);
 }

 const refreshCart = async () =>
 {
   const newCart = await commerce.cart.refresh();
   setCart(newCart);
 }

const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
    setOrder(incomingOrder)
    refreshCart();
  } catch(error){
    setErrorMsg(error.data.error.message);
  }
}

  useEffect(() =>
  {
   fetchProducts();
  },[]);
  return (
      <Router>
        <div>
          <Navbar totalItems={cart.total_items}/>
           <Switch>
           <Route exact path="/">
           <Products products={products} onAddToCart={handleCart}/>
           </Route>
           <Route exact path="/cart">
           <Cart 
           cart={cart}
           fun1={handelUpdateCartQuantity}
           fun2={handleRemoveFromCart}
           fun3={handleEmptyCart}
            />
           </Route>
           <Route exact path="/checkout">
           <Checkout cart={cart} order={order} handleCaptureCheckout={handleCaptureCheckout} errorMsg={errorMsg}
           />
           </Route>
          </Switch>
      </div>
      </Router>
  )
}

export default App;
