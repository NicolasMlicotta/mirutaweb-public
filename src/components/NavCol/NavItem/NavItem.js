import React from "react";
import styles from "./NavItem.module.css";
import { Link } from "react-router-dom";

function NavItem({ to, text, main, route }) {
  console.log("route", route);
  console.log("to", to);
  let bold = {};
  if (to === route) {
    bold = { fontWeight: "bold" };
  }
  return (
    <Link to={to} className={styles.navcolLink}>
      <p style={bold} className={!main ? "navcol-text" : "false"}>
        {text}
      </p>
    </Link>
  );
}

export default NavItem;
