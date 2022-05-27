import React, { useState } from "react";
import "./Novedad.css";
import CustomButton from "../CustomButton/CustomButton";

function Novedad({ data, docId, handleBorrar }) {
  const [checked, setChecked] = useState(false);

  let date = new Date(data.fecha + "Z");
  let fechaArg = date.toLocaleDateString();

  return (
    <div className="novedad-container">
      <div className="novedad-header">
        <h3 className="novedad-texto">{data?.cd}</h3>
        <h3 className="novedad-texto">{fechaArg}</h3>
      </div>
      <h3 className="novedad-texto">{data?.titulo}</h3>
      <p className="novedad-texto">{data?.texto}</p>
      {data.imgurl && (
        <div className="novedad-img-container">
          <img
            src={data?.imgurl}
            alt="Imagen de la novedad"
            height={"150px"}
            width={"150px"}
          />
        </div>
      )}
      <div className="borrar-box">
        <div>
          <input
            type="checkbox"
            id="scales"
            name="scales"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <label htmlFor="scales"> Quiero borrarla</label>
        </div>
        <CustomButton
          onClick={() => {
            if (checked) {
              handleBorrar(docId);
            } else {
              window.alert("Confirmá con el check.");
            }
          }}
          text="Borrar"
          size="small"
        />
      </div>
    </div>
  );
}

export default Novedad;
