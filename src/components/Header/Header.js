import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import "./Header.css";
import { HiOutlineMenu } from "react-icons/hi";
import img from "../../img/icon.png";

function Header({ isAuthenticated, toggle, setToggle }) {
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
          <img
            src={img}
            alt="Imagen de la novedad"
            height={"80px"}
            width={"80px"}
            style={{ borderRadius: "10px", marginLeft: "-1.8rem" }}
          />
        </div>
      </div>
      {isAuthenticated && (
        <div className="right-container">
          <ul className="ul-profile">
            <Link to="login" className="nav-link-profile">
              {userData?.nombre} {userData?.apellido}
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
