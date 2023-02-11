import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { auth } from "../Config/Config";
import "./Style.css";

const Navbar = ({ user,qtyProducts }) => {
  let history = useHistory();

  let logout = () => {
    auth.signOut();
    history.push("/login");
  };
  return (
    <div className="navbar1">
      <div className="logo-webiste">E-com</div>
      <div className="ul-list">
        <NavLink className="li" to="/">
          Home
        </NavLink>
        
        <NavLink className="li" to="/addproduct">
          Product
        </NavLink>

        {user ? (
          <>
            <NavLink className="li" to="/cart">
              <i class="fa fa-shopping-cart"></i>{qtyProducts}
            </NavLink>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="li" to="/signup">
              Signup
            </NavLink>
            <NavLink className="li" to="/login">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
