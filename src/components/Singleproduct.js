import React from 'react'

const Singleproduct = ({single,addToCart}) => {

    let handleAddToCart =()=>{
        addToCart(single);
    }
  return (
    <div className="container py-5">
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
              
                    <img src={single.url} alt="" className="mx-auto" width="200px" />
                    <hr />
                    <div className="card-body">
                    <h5>{single.title}</h5>
                    <p>{single.description}</p>
                    <h5>₹{single.price}.00</h5>
                    <button className="btn btn-danger" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Singleproduct