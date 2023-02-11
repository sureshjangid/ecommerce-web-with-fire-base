import React from 'react'
import SingleCart from './SingleCart'

const CartProduct = ({cartProduct,cartProductPlus,cartProductSub,cartProductDelete}) => {
  return(
      <div className="container">
          <div className="row">
              {cartProduct.map((singleCart)=>{
                  return (<>
                    <div className="col-lg-4">    <SingleCart key={singleCart.ID} cartProductDelete={cartProductDelete} cartProductSub={cartProductSub} singleCart={singleCart}  cartProductPlus={cartProductPlus} /></div>
                  </>
                  )
              })}
          </div>
      </div>
  )
}

export default CartProduct