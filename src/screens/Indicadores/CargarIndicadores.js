import React, { useState } from "react";
import "./CargarIndicadores.css";
import uploadData from "../../firebase/uploadData";
import Titulo from "../../components/Titulo/Titulo";
import CustomButton from "../../components/CustomButton/CustomButton";
import Loading from "../../components/Loading/Loading";

function CargarIndicadores() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // const SubirIndicadores = () => {
  //   setLoading(true);
  //   uploadData(setLoading);
  // };

  return (
    <div className="cargar-indicadores-wrapper">
      <Titulo>Cargar Indicadores</Titulo>
      <Loading loading={loading}>
        <div className="cargar-feedbacks-container">
          <p className="mensaje">
            1) Cargá los datos en el sheet<br></br>
            2) Hacé click en el botón “Subir Indicadores” en esta página.
            <br></br>
            <br></br>
            Para actualizar un valor cargalo de nuevo con la fecha
            correspondiente y se sobreescribirán los datos.
          </p>
          <a
            style={{
              marginBlock: "2rem",
              fontSize: "1.4rem",
              textAlign: "left",
            }}
            href="https://docs.google.com/spreadsheets/d/1Ou-pDb2tdYPu7xSu2LeGAc5jF0vofShBoP5XxLFvBOg/edit#gid=0"
            target={"_blank"}
          >
            GOOGLE SHEET
          </a>
          <div className="cargar-container">
            <div>
              <input
                type="checkbox"
                id="scales"
                name="scales"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <label htmlFor="scales"> Ya completé el sheet</label>
            </div>
            <CustomButton
              text="Subir Indicadores"
              onClick={() => {
                if (checked) uploadData(setLoading);
                else window.alert("Confirmá con el check");
              }}
            />
          </div>
        </div>
      </Loading>
    </div>
  );
}

export default CargarIndicadores;
