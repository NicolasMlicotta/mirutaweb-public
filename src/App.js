import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NavBar from "./components/NavBar/NavBar";
import CargarIndicadores from "./screens/Indicadores/CargarIndicadores";
import Feedbacks from "./screens/Feedbacks/Feedbacks";
import Registro from "./screens/Registro/Registro";
import Login from "./screens/Login/Login";
import FeedbackResponder from "./screens/FeedbackResponder/FeedbackResponder";
import BuscarSku from "./screens/BuscarSku/BuscarSku";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Novedades from "./screens/Novedades/Novedades";
import NavCol from "./components/NavCol/NavCol";
import NuevoSku from "./screens/NuevoSku/NuevoSku";
import CargarNovedad from "./screens/CargarNovedad/CargarNovedad";
import { getAuth } from "firebase/auth";
import UserContext from "./context/UserContext";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./components/PrivateRoute";
import getUser from "./firebase/getUser";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase/firebaseConfig";

function App() {
  //setUserData lo uso en el login y en la verificación en appjs si ya está logueado
  const [userData, setUserData] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toggle, setToggle] = useState(false);
  const auth = getAuth();
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserData(await getUser(user.email));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  return (
    <div className="app">
      <UserContext.Provider value={[userData, setUserData]}>
        <BrowserRouter initial>
          <NavBar
            isAuthenticated={isAuthenticated}
            toggle={toggle}
            setToggle={setToggle}
          />
          {toggle && <NavCol />}
          <div className="app-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route index path="/" element={<Novedades />} />
              <Route
                path="/feedbacks/:estado"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Feedbacks />
                  </PrivateRoute>
                }
              />
              <Route
                path="/indicadores"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <CargarIndicadores />
                  </PrivateRoute>
                }
              />
              <Route
                path="/nuevosku"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <NuevoSku />
                  </PrivateRoute>
                }
              />
              <Route
                path="/buscarsku"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <BuscarSku />
                  </PrivateRoute>
                }
              />
              <Route
                path="/registro"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Registro />
                  </PrivateRoute>
                }
              />
              <Route
                path="/responderfeedback"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <FeedbackResponder />
                  </PrivateRoute>
                }
              />
              <Route
                path="/novedades"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <Novedades />
                  </PrivateRoute>
                }
              />
              <Route
                path="/CargarNovedad"
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated}>
                    <CargarNovedad />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
