import React, { useEffect, useState } from "react";
import { auth, fs } from "../Config/Config";
import Navbar from "./Navbar";
import Product from "./Product";

const Home = (props) => {
  let [user, setUser] = useState(null);
  let [products, setProduct] = useState([]);
  let [qtyProducts, setProductQty] = useState(0);

  // fetching the data
  let getProduct = async () => {
    const products = await fs.collection("products").get();
    const proArray = [];

    for (var snap of products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      proArray.push({
        ...data,
      });
      if (proArray.length === products.docs.length) {
        setProduct(proArray);
      }
    }
  };
  useEffect(() => {
    getProduct();
  }, []);


  //Getting the USER UID
  function GetUserUid() {
    let [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }
  let uid = GetUserUid();

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

  //Add to Cart
  let product;
  let addToCart = (products) => {
    if (uid !== null) {
      product=products;
      product['qty'] = 1;
      product['TotalProductPrice'] = product.qty*product.price;
      fs.collection('Cart ' + uid).doc(product.ID).set(product).then(()=>{
        alert('Product Added to cart');

        
      })
    } else {
      props.history.push("/login");
    }
  };

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
  },[])


  return (
    <div>
      <Navbar user={user} qtyProducts={qtyProducts}/>

      {products.length > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Product products={products} addToCart={addToCart} />
            </div>
          </div>
        </div>
      )}
      {products.length < 1 && <div>...Please Wait</div>}
    </div>
  );
};

export default Home;
