import React from "react";
import "./MostrarSku.css";

function MostrarSku({ data }) {
  return (
    <div className="mostrar-sku-container">
      <ul>
        <li className="sku-item">SKU: {data?.idsku}</li>
        <li className="sku-item">Tipo: {data?.Tipo}</li>
        <li className="sku-item">Descripción: {data?.Descripcion}</li>
        <li className="sku-item">Unidades por bulto: {data?.UnidadesBulto}</li>
        <div className="sku-mostrar-img">
          {data?.ImgUrl == null ? (
            <img
              src={require("../../img/default-min.jpg")}
              alt=""
              height="300px"
              width="300px"
            />
          ) : (
            <img src={data?.ImgUrl} alt="" height="300px" width="300px" />
          )}
        </div>
      </ul>
    </div>
  );
}

export default MostrarSku;
