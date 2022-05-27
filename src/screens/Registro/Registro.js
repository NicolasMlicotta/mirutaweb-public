import { initializeApp } from "firebase/app";
import React, { useState } from "react";
import firebaseConfig from "../../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Registro.css";

const Registro = () => {
  const app = initializeApp(firebaseConfig);
  const [selectOL, setSelectOL] = useState("CMQ");
  const [selectRol, setSelectRol] = useState("CMQ");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const auth = getAuth();

  const crearUserFirestore = (uid, objeto) => {
    const db = getFirestore(app);
    console.log("cargando.....");

    // Add a new document in collection "cities"
    setDoc(doc(db, "usuarios", uid), objeto)
      .then(() => {
        console.log("ok subido");
        alert("Usuario Registrado");
      })
      .catch();
  };

  const registrar = () => {
    const mail = dni + "_choferescmq@miruta.com";
    createUserWithEmailAndPassword(auth, mail, "123456")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        const email = user.email;
        const objeto = {
          nombre: nombre,
          apellido: apellido,
          dni: dni,
          ol: selectOL,
          rol: selectRol,
          uid: uid,
          email: email,
        };
        console.log(objeto);

        crearUserFirestore(mail, objeto);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ..
      });
  };
  return (
    <div className="registro-container">
      <h1>Registro</h1>
      <div className="formulario">
        <input
          type="number"
          placeholder="dni"
          className="input-text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
        <input
          value={nombre}
          type="text"
          placeholder="nombre"
          className="input-text"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          value={apellido}
          type="text"
          placeholder="apellido"
          className="input-text"
          onChange={(e) => setApellido(e.target.value)}
        />
        <label htmlFor="ol">Organización:</label>
        <select
          name="ol"
          id="ol"
          onChange={(e) => setSelectOL(e.target.value)}
          className="select-ol"
          value={selectOL}
        >
          <option value="CMQ">CMQ</option>
          <option value="AYG">AYG</option>
          <option value="TASA">TASA</option>
          <option value="RDV">RDV</option>
        </select>
        <label htmlFor="rol">Rol en la organización:</label>
        <select
          name="rol"
          id="rol"
          onChange={(e) => setSelectRol(e.target.value)}
          className="select-rol"
          value={selectRol}
        >
          <option value="CMQ">CMQ</option>
          <option value="Chofer">Chofer</option>
          <option value="Ayudante">Ayudante</option>
          <option value="Administrativo">Administrativo</option>
        </select>
        <button onClick={() => registrar()}>Registrar</button>
      </div>
    </div>
  );
};

export default Registro;
