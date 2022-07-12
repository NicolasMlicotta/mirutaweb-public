import { initializeApp } from "firebase/app";
import React, { useState } from "react";
import firebaseConfig from "../../firebase/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Registro.css";
import { FaWindows } from "react-icons/fa";
import CustomButton from "../../components/CustomButton/CustomButton";

const Registro = () => {
  const app = initializeApp(firebaseConfig);
  const [selectOL, setSelectOL] = useState("CMQ");
  const [selectRol, setSelectRol] = useState("CMQ");
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const crearUserFirestore = (uid, objeto) => {
    const db = getFirestore(app);
    // Add a new document in collection "cities"
    setDoc(doc(db, "usuarios", uid), objeto)
      .then(() => {
        alert("Usuario Registrado");
      })
      .catch();
  };

  const registrar = () => {
    const mail = dni + "_choferescmq@miruta.com";
    let passOk;
    if (selectOL == "CMQ") {
      passOk = password;
    } else {
      passOk = "123456";
    }
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      dni.trim() === "" ||
      passOk.trim() === ""
    ) {
      window.alert("Complete todos los campos");
      return;
    }
    createUserWithEmailAndPassword(auth, mail, passOk)
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
        crearUserFirestore(mail, objeto);

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        window.alert("Error al registrar el usuario " + errorMessage);
        // ..
      });
  };
  return (
    <div className="registro-container">
      <h1>Registro de Usuarios</h1>
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
          placeholder="Nombre"
          className="input-text"
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          value={apellido}
          type="text"
          placeholder="Apellido"
          className="input-text"
          onChange={(e) => setApellido(e.target.value)}
        />
        {selectOL === "CMQ" && (
          <input
            value={password}
            type="password"
            placeholder="Contraseña"
            className="input-text"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

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
          className="select-ol"
          value={selectRol}
        >
          <option value="CMQ">CMQ</option>
          <option value="Chofer">Chofer</option>
          <option value="Ayudante">Ayudante</option>
          <option value="Administrativo">Administrativo</option>
        </select>

        <CustomButton onClick={() => registrar()} text="Registrar Usuario" />
      </div>
    </div>
  );
};

export default Registro;
