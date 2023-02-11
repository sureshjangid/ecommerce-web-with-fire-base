import React, { useState } from "react";
import { auth, fs } from "../Config/Config";
import { useHistory } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Model = ({ totalPrice, qty}) => {
  let [userProduct, setUserProduct] = useState({
    total: totalPrice,
    totalQty: qty,
    address: "",
    name: "",
    phone: "",
    email: "",
  });

  let history = useHistory();
  let { email, total, totalQty, address, name, phone } = userProduct;

  let handleFlied = (e) => {
    setUserProduct({ ...userProduct, [e.target.name]: e.target.value });
  };

  // Form Submit
  let FormSubmit = async (e) => {
    e.preventDefault();
    let uid = auth.currentUser.uid;
    let cartData = await fs.collection("Cart " + uid).get();

    for (var snap of cartData.docs) {
      var data = snap.data();
      data.ID = snap.id;

      await fs.collection("Buyer-Cart " + uid).add({
        name: name,
        email: email,
        phone: phone,
        address: address,
        totalPrice: totalPrice,
        data: data,
      });
      await fs
        .collection("Cart " + uid)
        .doc(snap.id)
        .delete();
    }
    history.push("/");
    toast.success('Your Order placed Successfully 🤣!',{ 
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Billing Address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={FormSubmit}>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => handleFlied(e)}
                    name="email"
                    value={email}
                  />
                  <div id="emailHelp" class="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => handleFlied(e)}
                    name="name"
                    value={name}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Address with House No.
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => handleFlied(e)}
                    name="address"
                    value={address}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Phone No.
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    onChange={(e) => handleFlied(e)}
                    name="phone"
                    value={phone}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Total Price
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    value={total}
                    readOnly
                    id="exampleInputPassword1"
                    onChange={(e) => handleFlied(e)}
                    name="total"
                  />
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
