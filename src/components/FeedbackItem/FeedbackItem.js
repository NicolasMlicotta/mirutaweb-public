import React from "react";
import "./FeedbackItem.css";
import { Link } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

function FeedbackItem({ data }) {
  const fecha = data.fecha;
  const motivo = data.motivo;
  const estado = data.estado;
  const detalle = data.detalle;
  const creador = data.creador;

  return (
    <div className="container">
      <div className="head">
        <p className="head-text">{fecha}</p>
        <p className="head-text">{motivo}</p>
        <p className="head-text">{estado}</p>
      </div>
      <div className="desc-container">
        <p className="desc-text">{detalle}</p>
      </div>
      <div className="autor-container">
        <p className="creador-text">Creado por {creador} </p>
        <Link
          to="/responderfeedback"
          state={data}
          style={{ textDecoration: "none" }}
        >
          <CustomButton
            text={estado == "Pendiente" ? "Responder" : "Ver Respuesta"}
            size="small"
          />
        </Link>
      </div>
    </div>
  );
}

export default FeedbackItem;
