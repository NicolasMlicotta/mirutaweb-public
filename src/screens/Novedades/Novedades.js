import React, { useEffect, useState } from "react";
import Novedad from "../../components/Novedad/Novedad";
import Titulo from "../../components/Titulo/Titulo";
import Loading from "../../components/Loading/Loading";
import borrarNovedad from "../../firebase/borrarNovedad";
import getNovedades from "../../firebase/getNovedades";
import "./Novedades.css";

function Novedades() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    read();
  }, []);

  const handleBorrar = (id) => {
    if (borrarNovedad(id)) {
      const newData = data.filter((dato) => dato.key != id);
      window.alert("Borrado correctamente");
      setData(newData);
    } else {
      window.alert("Error borrando los datos");
    }
  };

  async function read() {
    const items = await getNovedades();
    setData(items);
    setLoading(false);
  }

  return (
    <div>
      <Titulo>Novedades</Titulo>
      <Loading loading={loading}>
        <div>
          {data.map((doc, index) => {
            return (
              <Novedad
                key={index}
                data={doc.data}
                docId={doc.key}
                handleBorrar={handleBorrar}
              />
            );
          })}
        </div>
      </Loading>
    </div>
  );
}

export default Novedades;
