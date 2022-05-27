import React from "react";
import ReactLoading from "react-loading";
import "./Loading.css";

function Loading({ loading, children }) {
  return (
    <div className="loading-container">
      {loading ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"black"}
          height={50}
          width={50}
        />
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

export default Loading;
