import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FeedbackResponder.css";
import firebaseConfig from "../../firebase/firebaseConfig";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import CustomButton from "../../components/CustomButton/CustomButton";
import Titulo from "../../components/Titulo/Titulo";

function FeedbackResponder() {
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  const location = useLocation();
  const docId = location.state.feedbackID;
  const fecha = Date();
  const [respuesta, setRespuesta] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [infoUser, setInfoUser] = useState({});

  const getInfoUser = async (email) => {
    const docRef = doc(db, "usuarios", email);
    const docSnap = await getDoc(docRef);
    setInfoUser(docSnap.data());
    console.log(docSnap.data());
  };

  useEffect(() => {
    const mailtag = "_choferescmq@miruta.com";
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setLogueado(true);
        getInfoUser(user.email);

        // ...
      } else {
        // User is signed out
        // ...
        setLogueado(false);
      }
    });
  }, []);

  function UpdateFeedback() {
    if (respuesta == "") {
      alert("Complete el texto.");
      return;
    }

    const ref = doc(db, "feedbacks", docId);
    updateDoc(ref, {
      respuesta: respuesta,
      dniRespuesta: infoUser.dni,
      usuarioRespuesta: infoUser.nombre + " " + infoUser.apellido,
      fechaRespuesta: fecha,
      estado: "Resuelto",
    }).then(() => {
      alert("Respuesta cargada correctamente.");
      navigate("/feedbacks");
    });
  }

  return (
    <div>
      <Titulo>Responder Feedback</Titulo>
      <div className="container">
        {location.state ? (
          <>
            <div className="head">
              <p className="head-text">{location.state.fecha}</p>
              <p className="head-text">{location.state.motivo}</p>
              <p className="head-text">{location.state.estado}</p>
            </div>
            <div className="desc-container">
              <p className="desc-text">{location.state.detalle}</p>
            </div>
            <div className="autor-container">
              <p className="creador-text">
                Creado por {location.state.creador}{" "}
              </p>
            </div>
            <div style={{ marginTop: "2rem" }}> </div>
            {/* empieza imagen */}
            {location.state.imgurl == null ? (
              <img
                src={require("../../img/default-min.jpg")}
                alt=""
                height="250px"
                width="250px"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={location.state.imgurl}
                alt=""
                height="250px"
                width="250px"
                style={{ objectFit: "cover" }}
              />
            )}
            {/* termina imagen */}
            <div className="respuesta-box"></div>
            <textarea
              rows={5}
              cols={100}
              placeholder="Respuesta"
              style={{ padding: 10, marginBlock: 20 }}
              onChange={(e) => setRespuesta(e.target.value)}
              value={
                location.state.estado == "Pendiente"
                  ? respuesta
                  : "Respuesta: " + location.state.respuesta
              }
            />
            {location.state.estado == "Pendiente" ? (
              <CustomButton onClick={UpdateFeedback} text="Responder" />
            ) : (
              "Contestó: " + location.state.usuarioRespuesta
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default FeedbackResponder;
