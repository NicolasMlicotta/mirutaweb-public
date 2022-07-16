import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkSinEstilos.module.css";

function LinkSinEstilos({ children, state, to }) {
  return (
    <div>
      <Link to={to} className={styles.link} state={state}>
        {children}
      </Link>
    </div>
  );
}

export default LinkSinEstilos;
