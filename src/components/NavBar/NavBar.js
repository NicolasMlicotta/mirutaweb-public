import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./NavBar.css";
import { HiOutlineMenu } from "react-icons/hi";

function NavBar({ isAuthenticated, toggle, setToggle }) {
  const [userData] = useContext(UserContext);

  return (
    <div className="navbar-container">
      <div className="left-container">
        <div className="logo-container">
          <HiOutlineMenu
            color="white"
            fontSize={50}
            style={{ cursor: "pointer", transform: [{ rotate: "90deg" }] }}
            onClick={() => setToggle(!toggle)}
            className={toggle && "rotateMenu"}
          />
          <Link className="logo" to="/novedades">
            MiRuta
          </Link>
        </div>
      </div>
      {isAuthenticated && (
        <div className="right-container">
          <ul className="ul-profile">
            <Link to="login" className="nav-link-profile">
              {userData.nombre} {userData.apellido}
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
