import React, { useState, useContext, useEffect } from "react";
import "./Login.css";
import login from "../../firebase/login";
import CustomButton from "../../components/CustomButton/CustomButton";
import UserContext from "../../context/UserContext";
import isLogged from "../../firebase/isLogged";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLogueado(isLogged());
  }, [userData]);

  const handleLogin = () => {
    setLoading(true);
    if (dni === "") {
      alert("Escriba su dni");
      setLoading(false);
      return;
    }
    if (password === "") {
      alert("Escriba su contraseña");
      setLoading(false);
      return;
    }
    const success = login(dni, password, "login", setUserData);
    setLoading(false);
  };

  return (
    <>
      <Loading loading={loading}>
        {!logueado ? (
          <div className="formulario">
            <h1>Iniciar Sesión</h1>
            <div className="input-container">
              <input
                type="number"
                placeholder="DNI"
                className="input-text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
              <input
                value={password}
                type="password"
                placeholder="Contraseña"
                className="input-text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <CustomButton
              onClick={handleLogin}
              text="Iniciar Sesión"
              size="large"
            />
          </div>
        ) : (
          <div>
            <div className="formulario-logout">
              <h1>{userData?.nombre + " " + userData?.apellido} </h1>
              <CustomButton
                onClick={() => login(null, null, "logout", setUserData)}
                text="Cerrar Sesión"
                size="large"
              />
            </div>
          </div>
        )}
      </Loading>
    </>
  );
};

export default Login;
