import React from "react";
import styles from "./NavItem.module.css";
import { Link } from "react-router-dom";

function NavItem({ to, text, main }) {
  return (
    <Link to={to} className={styles.navcolLink}>
      <p className={!main ? "navcol-text" : "false"}>{text}</p>
    </Link>
  );
}

export default NavItem;
