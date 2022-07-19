import React, { useState } from "react";
import agregarSku from "../../firebase/agregarSku";
import ReactLoading from "react-loading";
import { Formik } from "formik";
import Titulo from "../../components/Titulo/Titulo";
import "../NuevoSku/NuevoSku.css";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useLocation } from "react-router-dom";

function EditarSku() {
  const location = useLocation();
  const { Descripcion, ImgUrl, Tipo, UnidadesBulto, idsku } = location.state;
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);
  let skudata = {
    sku: idsku,
    tipo: Tipo,
    descripcion: Descripcion,
    unidades: UnidadesBulto,
    url: ImgUrl,
  };

  const handleImagen = (event) => {
    const pesoMb = event.currentTarget.files[0].size / 1000000;
    if (pesoMb < 0.3) {
      setImagen(event.currentTarget.files[0]);
    } else {
      window.alert(
        "La imagen supera 0.3Mb de peso. Por favor comprimila antes de subirla."
      );
      setImagen(null);
      return;
    }
  };
  return (
    <div>
      <Titulo>Editar SKU</Titulo>
      {cargando ? (
        <ReactLoading
          type={"spinningBubbles"}
          color={"black"}
          height={50}
          width={50}
        />
      ) : (
        <Formik
          initialValues={skudata}
          validate={(values) => {
            const errors = {};
            if (!values.sku) {
              errors.sku = "SKU OBLIGATORIO";
            }
            return errors;
          }}
          onSubmit={(values) => {
            setCargando(true);
            agregarSku(values, imagen, setCargando);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <div className="nuevosku-container">
              <form className="nuevosku-form">
                <div className="box-input">
                  <input
                    type="number"
                    name="sku"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sku}
                    className="formik-input"
                    placeholder="Código SKU"
                  />
                </div>
                <div className="box-input">
                  <input
                    type="text"
                    name="tipo"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.tipo}
                    className="formik-input"
                    placeholder="Tipo"
                  />
                </div>
                <div className="box-input">
                  <input
                    type="text"
                    name="descripcion"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descripcion}
                    className="formik-input-descripcion"
                    placeholder="Descripción"
                  />
                </div>
                <div className="box-input">
                  <input
                    type="number"
                    name="unidades"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.unidades}
                    placeholder="Unidades por bulto"
                    className="formik-input"
                  />
                </div>
                <h3 className="formik-img-subir">
                  Por favor subí una imagen cuadrada y que pese menos de 0.3Mb
                  <br></br>
                  <a href="https://imagecompressor.com/es/" target={"_blank"}>
                    Acá podés comprimir el tamaño de la imagen
                  </a>
                </h3>

                <div className="formik-img-subir">
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={handleImagen}
                    className="cargar-sku"
                  />
                  {imagen ? (
                    <img
                      src={URL.createObjectURL(imagen)}
                      alt=""
                      width="200px"
                      height="200px"
                    />
                  ) : (
                    <img src={ImgUrl} alt="" width="200px" height="200px" />
                  )}
                </div>

                <CustomButton text="Editar SKU" onClick={handleSubmit} />
              </form>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
}
export default EditarSku;
