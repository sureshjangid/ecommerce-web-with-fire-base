import React from "react";

const SingleCart = ({ singleCart, cartProductPlus ,cartProductSub,cartProductDelete}) => {
    
  let cartQtyPlus = () => {
    cartProductPlus(singleCart);
  };

  let cartQtySub  =()=>{
    cartProductSub(singleCart)
  }

  let cartDataDelete = ()=>{
    cartProductDelete(singleCart)
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="card" style={{ width: "18rem" }}>
            <img
              className="card-img-top mx-auto"
              src={singleCart.url}
              style={{ width: "200px", height: "150px" }}
              alt="Card image cap"
            />
            <div className="card-body mx-auto text-center">
            <button className=" bg-danger text-light " onClick={cartDataDelete}> <i class="fa fa-trash-o"></i></button>
              <h6 className="card-title">{singleCart.title}</h6>
              <p className="card-text">₹{singleCart.price}</p>
              <button onClick={cartQtyPlus}>
                <i className="fa fa-plus-circle"></i>
              </button>
              <b>{singleCart.qty}</b>
              <button onClick={cartQtySub}>
                <i className="fa fa-minus-circle"></i>
              </button> Total Price = ₹{singleCart.qty * singleCart.price}
             

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCart;
