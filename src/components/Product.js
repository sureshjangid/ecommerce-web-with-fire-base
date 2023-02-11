import React from "react";
import Singleproduct from "./Singleproduct";

const Product = ({ products , addToCart}) => {

  return(

    <div className="container">
    <div className="row">
      {products.map((singleProduct) => (
       <>
         <div className="col-lg-4"> <Singleproduct key={singleProduct.ID} single={singleProduct} addToCart={addToCart}/></div>
       </>
      ))}
    </div>
  </div>
    )
};
export default Product;
