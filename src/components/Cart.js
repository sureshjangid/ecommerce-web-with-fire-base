import React, { useEffect, useState } from "react";
import { auth, fs } from "../Config/Config";
import Navbar from "./Navbar";
import CartProduct from "./CartProduct";
import  StripeCheckout from 'react-stripe-checkout';
import Model from "./Model";
const Cart = () => {
  let [user, setUser] = useState(null);
  let [qtyProducts, setProductQty] = useState(0);
  let [cartProduct, setCartProduct] = useState([]);

  // User Details
  let GetUser = () => {
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((data) => {
              setUser(data.data().name);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
  };
  GetUser();

  // getting the cart product for login user

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((data) => {
          let newCartProduct = data.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));
          setCartProduct(newCartProduct);
        });
      } else {
        console.log("user is not signup");
      }
    });
  }, []);


  // global variable
  let product;
  let cartProductPlus = (cartProduct) => {
product=cartProduct;

if(product.qty <10){

  product.qty=product.qty+1;
  product.TotalProductPrice=product.qty*product.price;
  
  // updating the database
  auth.onAuthStateChanged((user)=>{
  
    if(user){
      fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(product).then(()=>{
      })
    }else{
      console.log('User not login');
    }
    
  })

  if(product.qty==10){
    alert('Max 10 Product ')
  }
}
  };
  
  // Sub the Qtu
  let cartProductSub =(cartProduct)=>{
    product=cartProduct;

    if(product.qty>1){
      product.qty=product.qty-1;
      product.TotalProductPrice=product.qty*product.price;
  
      auth.onAuthStateChanged((user)=>{
        if(user){
          fs.collection('Cart ' + user.uid).doc(cartProduct.ID).update(product).then(()=>{
          })
        }else{
          console.log('User not login');
        }
      })

    }
  }

  // Delete product from cart for user
  let cartProductDelete = (cartProduct)=>{
auth.onAuthStateChanged((user)=>{
  if(user){
    fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete(cartProduct).then(()=>{

    })
  }else{
    console.log('user not login');
  }
})
  }

  // getting Total QTY product

  const qty = cartProduct.map((cartProduct)=>{
    return cartProduct.qty; 
  });
  const reduceQty = (accmulator,currentValue) =>accmulator+currentValue;
  const totalQty = qty.reduce(reduceQty,0);

  // total product price
  const totalPrice = cartProduct.map((cartProduct)=>{
    return cartProduct.TotalProductPrice;
  });
  const reducePrice = (acc,curr)=>acc+curr;
  let priceTotal = totalPrice.reduce(reducePrice,0)
  
  // Count the Total product added in Cart
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        fs.collection('Cart ' + user.uid).onSnapshot((data)=>{
          let qty = data.docs.length;
          setProductQty(qty);
        })
      }
    })
  },[]);

  
  return (
    <>
      <Navbar user={user} qtyProducts={qtyProducts}/>

      <div className="container py-5">
        <div className="row">
          {cartProduct.length < 1 && (
            <>
              <div className="container p-5">
                <div className="row">
                  <div className="col-12">
                    <h1 className="text-center text-danger">
                      No Product to Show😂
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {cartProduct.length > 0 && (
            <>
              <CartProduct
                cartProduct={cartProduct}
                cartProductPlus={cartProductPlus}
                cartProductSub={cartProductSub}
                cartProductDelete={cartProductDelete}
              />

              
          <div className="col-lg-4 p-5 mx-auto">
            <hr />
            <h6 className="text-center ">Cart Summary</h6>
            <br />
            <p className="mb-0">Total No Of Products : {totalQty}</p>
            <p>Total Price to Pay : ₹{priceTotal}.00</p>
            <StripeCheckout
           stripeKey="pk_test_51L9UmwSC2M3xBYNA7qq0GW1gS5BWRNWoR2lPWGCR3pde9U7xGKLUGhTk7hJ0aEEtNmPKyCeCxFUAvu4Lxnrg2bbo00kj62sEqE"
            >

            </StripeCheckout>
          <p className="p-3">OR</p>
            <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" >Cash on Dilevery</button>
          </div>
       
            <Model totalPrice={priceTotal} qty={totalQty} />
          
            </>
          )}

        </div>
      </div>
    </>
  );
};

export default Cart;
