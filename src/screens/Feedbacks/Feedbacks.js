import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import FeedbackItem from "../../components/FeedbackItem/FeedbackItem";
import { useParams } from "react-router-dom";
import "./Feedbacks.css";
import Loading from "../../components/Loading/Loading";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../../firebase/firebaseConfig";
import Titulo from "../../components/Titulo/Titulo";
import { getFeedbacksOl } from "../../firebase/getFeedbacksOl";

function Feedbacks() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  let status = useParams().estado;
  const mailtag = "_choferescmq@miruta.com";
  const [cargando, setCargando] = useState(true);
  const [descarga, setDescarga] = useState([
    {
      fecha: "",
      motivo: "",
      estado: "",
      detalle: "",
      creador: "",
      feedbackID: "",
    },
  ]);

  useEffect(() => {
    setCargando(true);
    getUser();
  }, [status]);

  function getUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const dni = user.email.split("_")[0];
        getInfo(dni + mailtag);
      } else {
        return {};
      }
    });
  }

  const getInfo = async (dni) => {
    const docRef = doc(db, "usuarios", dni);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const datos = await getFeedbacksOl(docSnap.data().ol, status);
      setDescarga(datos);
      setCargando(false);
    } else {
      window.alert("Error en la consulta al servidor.");
    }
  };

  return (
    <div>
      <Titulo>
        Feedbacks {status == "Pendiente" ? "Pendientes" : "Resueltos"}
      </Titulo>
      <Loading loading={cargando}>
        <div>
          {descarga.map((x, index) => (
            <FeedbackItem
              key={index}
              data={{
                fecha: x.fecha,
                motivo: x.motivo,
                estado: x.estado,
                detalle: x.detalle,
                creador: x.creador,
                feedbackID: x.feedbackID,
                imgurl: x.imgurl,
                respuesta: x.respuesta,
                usuarioRespuesta: x.usuarioRespuesta,
              }}
            />
          ))}
        </div>
      </Loading>
    </div>
  );
}
export default Feedbacks;
