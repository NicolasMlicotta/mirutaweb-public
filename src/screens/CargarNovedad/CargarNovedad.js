import React, { useEffect, useState } from "react";
import "./CargarNovedad.css";
import Loading from "../../components/Loading/Loading";
import getDb from "../../firebase/getDb";
import { addDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Formik, Field } from "formik";
import Titulo from "../../components/Titulo/Titulo";
import CustomButton from "../../components/CustomButton/CustomButton";

function CargarNovedad() {
  const [db, app] = getDb();
  const [cargando, setCargando] = useState(false);
  const [imagen, setImagen] = useState(null);

  const AgregarNovedad = ({ titulo, texto }, imagen) => {
    const date = Date();
    let objeto = {
      cd: "ROS1",
      fecha: date,
      titulo: titulo,
      texto: texto,
      imgurl: null,
      fechaCreacion: serverTimestamp(),
    };
    if (imagen != null) {
      uploadImage(imagen, objeto);
    } else {
      SubirDoc(objeto);
    }
  };
  const handleImagen = (event) => {
    const pesoMb = event.currentTarget.files[0].size / 1000000;
    console.log(pesoMb + "Mb");
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

  const uploadImage = (imagen, objeto) => {
    var id = Math.random().toString() + objeto.titulo;
    const storage = getStorage(app);
    const ruta = "imagenesnovedades/" + id;
    const reference = ref(storage, ruta);

    uploadBytes(reference, imagen)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        console.log("Download URL", downloadURL);
        objeto.imgurl = downloadURL;
        SubirDoc(objeto);
      });
  };

  const SubirDoc = (objeto) => {
    // Add a new document in collection "cities"
    addDoc(collection(db, "novedades"), objeto)
      .then(() => {
        console.log("ok subido");
        setCargando(false);
        alert("OK Cargado correctamente");
        setImagen(null);
      })
      .catch(setCargando(false));
  };

  return (
    <div>
      <Titulo>Cargar Novedad</Titulo>
      <Loading loading={cargando}>
        <Formik
          initialValues={{ titulo: "", texto: "", cd: "seleccione" }}
          onSubmit={(values) => {
            setCargando(true);
            if (values.cd != "seleccione" && values.titulo != "") {
              AgregarNovedad(values, imagen);
            } else {
              window.alert("Seleccione CD y complete t??tulo");
              setCargando(false);
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form>
              <select
                name="cd"
                id="cd"
                className="novedad-select"
                value={values.cd}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="seleccione">Seleccione CD</option>
                <option value="ROS1">Rosario 1</option>
                <option value="ROS2">Rosario 2</option>
                <option value="SFE">Santa Fe</option>
              </select>
              <input
                type="text"
                name="titulo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.titulo}
                placeholder="T??tulo"
                className="novedad-input"
              />

              <Field
                as="textarea"
                name="texto"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.texto}
                placeholder="Texto"
                className="novedad-input-area"
              />
              <h3>
                Por favor sub?? una imagen que sea cuadrada y pese menos de 0.3
                Mb.
              </h3>
              <h3>
                <a href="https://imagecompressor.com/es/" target={"_blank"}>
                  Ac?? pod??s comprimir el tama??o de la imagen
                </a>
              </h3>
              <div className="novedad-input-file">
                <input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleImagen}
                />
                {imagen && (
                  <img
                    src={URL.createObjectURL(imagen)}
                    alt=""
                    width="100px"
                    height="100px"
                  />
                )}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CustomButton onClick={handleSubmit} text="Cargar" />
              </div>
            </form>
          )}
        </Formik>
      </Loading>
    </div>
  );
}

export default CargarNovedad;
