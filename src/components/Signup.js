import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { auth, fs } from "../Config/Config";

const Signup = () => {
  const history = useHistory();

  let [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  let { name, email, password } = signupDetails;
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");

  let handleSignup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        fs.collection("users")
          .doc(credentials.user.uid)
          .set({
            name: name,
            email: email,
            password: password,
          })
          .then(() => {
            setSuccess("Signup Successfully");
            setSignupDetails("");
            setError("");
            setTimeout(() => {
              setSuccess("");
              history.push("/login");
            }, 3000);
          });
      })
      .catch((error) => {
        setError(error.message);
        setTimeout(() => {
          setError("");
        }, 5000);
      });
  };
  let inputFiled = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container p-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <h1>Signup User</h1>

            <hr />
            {success && (
              <>
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              </>
            )}
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={(e) => inputFiled(e)}
                value={name}
                className="form-control mb-1"
              />
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={(e) => inputFiled(e)}
                value={email}
                className="form-control mb-1"
              />
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={(e) => inputFiled(e)}
                value={password}
                className="form-control mb-1"
              />
              <p>
                Already have account click <NavLink to="/login">here</NavLink>{" "}
              </p>{" "}
              <button className="btn btn-outline-primary">Signup</button>
            </form>
            {error && (
              <>
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
