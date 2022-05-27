import React from "react";
import "./NavItem.css";
import { Link } from "react-router-dom";

function NavItem({ to, text, main }) {
  return (
    <Link to={to} className="navcol-link">
      <p className={!main ? "navcol-text" : "false"}>{text}</p>
    </Link>
  );
}

export default NavItem;
