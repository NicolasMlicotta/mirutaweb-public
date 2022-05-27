import React, { useState } from "react";
import leerSku from "../../firebase/leerSku";
import MostrarSku from "../../components/MostrarSku/MostrarSku";
import Titulo from "../../components/Titulo/Titulo";
import Loading from "../../components/Loading/Loading";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./BuscarSku.css";

function BuscarSku() {
  const [idBuscado, setIdBuscado] = useState("");
  const [cargando, setCargando] = useState(false);

  const [skudata, setSkudata] = useState({
    sku: "",
    tipo: "",
    descripcion: "",
    unidades: "",
  });
  const handleBuscar = (e) => {
    setIdBuscado(e.target.value);
  };

  const buscarSku = async () => {
    if (idBuscado == "") {
      window.alert("ESCRIBA UN SKU");
    } else {
      setCargando(true);
      const respuesta = await leerSku(idBuscado);
      setSkudata(respuesta);
      setCargando(false);
    }
  };

  return (
    <div>
      <Titulo>Buscar SKU</Titulo>
      <div className="buscarsku-container">
        <Loading loading={cargando}>
          <div className="buscar-box">
            <input
              id="buscar-sku"
              name="buscar-sku"
              type="text"
              value={idBuscado}
              onChange={handleBuscar}
              placeholder="Buscar SKU"
              className="input-buscar-sku"
            />
            <div className="btn-buscar-width">
              <CustomButton
                text="Buscar"
                onClick={() => buscarSku()}
                size="small"
              />
            </div>
          </div>
          <MostrarSku data={skudata} />
        </Loading>
      </div>
    </div>
  );
}

export default BuscarSku;
