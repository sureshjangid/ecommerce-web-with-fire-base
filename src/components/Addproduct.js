import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useEffect } from "react";
import { fs, storage } from "../Config/Config";
import Navbar from "./Navbar";
const Addproduct = () => {
  let [product, setAddProduct] = useState({
    title: "",
    price: "",
    description: "",
  });
  let { title, price, description } = product;

  let [image, setImage] = useState(null);

  let [imageError, setImageError] = useState("");

  let [success, setSuccess] = useState();
  let [error, setError] = useState();

  let imageType = ["image/jpg", "image/png", "image/jpeg", "image/PNG"];

  let handleImageFlied = (e) => {
    // e.preventDefault();

    let selectedImage = e.target.files[0];

    if (selectedImage) {
      if (selectedImage && imageType.includes(selectedImage.type)) {
        setImage(selectedImage);
        setImageError("");
      } else {
        setImage(null);
        setImageError("Please select valid image file png or jpg");
        setTimeout(() => {
          setImageError("");
        }, 3000);
      }
    } else {
      console.log("error");
    }
  };

  let ProductApp = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`product-image/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {},

      (error) => setImageError(error.message),
      () => {
        storage
          .ref("product-image")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("products")
              .add({
                title,
                description,
                price: Number(price),
                url,
              })
              .then(() => {
                setSuccess("Product added successfully");
                setAddProduct({
                  title:"",
                  price:"",
                  description:""
                });
                document.getElementById("file").value='';
                setImageError("");

                setTimeout(() => {
                  setSuccess("");
                }, 3000);
              })
              .catch((error) => setImageError(error.message));
          });
      }
    );
  };
  let inputFlied = (e) => {
    setAddProduct({ ...product, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Navbar />
      <div className="container p-5 mx-auto">
        <div className="row">
          <div className="col-lg-8">
            <h1>Add Product</h1>
            <hr />
            {success && (
              <>
                <div className="alert text-success">{success}</div>
              </>
            )}
            <form onSubmit={ProductApp}>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="title"
                  onChange={(e) => inputFlied(e)}
                  value={title}
                  id="exampleFormControlInput1"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">
                  Descritpion
                </label>
                <textarea
                  class="form-control"
                  name="description"
                  onChange={(e) => inputFlied(e)}
                  value={description}
                  id="exampleFormControlTextarea1"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Price
                </label>
                <input
                required
                  type="text"
                  class="form-control"
                  name="price"
                  onChange={(e) => inputFlied(e)}
                  value={price}
                  id="exampleFormControlInput1"
                />
              </div>

              {imageError && (
                <>
                  <div className="alert text-danger">{imageError}</div>
                </>
              )}
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Product Image
                </label>
                <input
                required
                  type="file"
                  id="file"
                  class="form-control"
                  // name="image"
                  onChange={handleImageFlied}
                  // value={image}
                />
              </div>

              <button className="btn btn-outline-dark" >Add Product</button>
            </form>
            {error && (
              <>
                <div className="alert text-danger">{error}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
