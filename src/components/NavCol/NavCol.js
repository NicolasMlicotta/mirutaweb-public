import React, { useState } from "react";
import NavItem from "./NavItem/NavItem";
import "./NavCol.css";
import { FaRegNewspaper } from "react-icons/fa";
import { IoBeerOutline } from "react-icons/io5";
import { FiTarget } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NavCol({ navigation }) {
  const route = useLocation().pathname;
  let navigate = useNavigate();
  const [dropdown, setdDropdown] = useState({
    feedbacks: false,
    sku: false,
    novedades: false,
    usuarios: false,
  });

  return (
    <div className="navcol-container">
      <span
        className="navcol-link"
        onClick={() =>
          setdDropdown({
            ...dropdown,
            novedades: !dropdown.novedades,
          })
        }
      >
        <FaRegNewspaper style={{ marginRight: "1rem", fontSize: 20 }} />{" "}
        Novedades
      </span>
      {dropdown.novedades && (
        <>
          <NavItem to="/cargarNovedad" text="Cargar" route={route} />
          <NavItem to="/novedades" text="Visualizar" route={route} />
        </>
      )}
      {/* <span
        className="navcol-link"
        onClick={() =>
          setdDropdown({
            ...dropdown,
            feedbacks: !dropdown.feedbacks,
          })
        }
      >
        <FaRegLightbulb style={{ marginRight: "1rem", fontSize: 20 }} />{" "}
        Feedbacks
      </span> */}
      {/* {dropdown.feedbacks && (
        <>
          <NavItem to="/feedbacks/Pendiente" text="Pendientes" />
          <NavItem to="/feedbacks/Resuelto" text="Resueltos" />
        </>
      )} */}
      <span
        className="navcol-link"
        onClick={() =>
          setdDropdown({
            ...dropdown,
            sku: !dropdown.sku,
          })
        }
      >
        {" "}
        <IoBeerOutline style={{ marginRight: "1rem", fontSize: 20 }} /> SKUs
      </span>
      {dropdown.sku && (
        <>
          <NavItem to="/nuevosku" text="Agregar" route={route} />
          <NavItem to="/buscarsku" text="Buscar/Editar" route={route} />
        </>
      )}

      <span
        className="navcol-link"
        onClick={() =>
          setdDropdown({
            ...dropdown,
            usuarios: !dropdown.usuarios,
          })
        }
      >
        {" "}
        <AiOutlineUser style={{ marginRight: "1rem", fontSize: 20 }} />
        Usuarios
      </span>
      {dropdown.usuarios && (
        <>
          <NavItem to="/registro" text="Registrar Usuario" route={route} />
          {/* <NavItem to="/" text="Editar Usuario" /> */}
        </>
      )}
      <span className="navcol-link" onClick={() => navigate("/indicadores")}>
        {" "}
        <FiTarget style={{ marginRight: "1rem", fontSize: 20 }} /> Indicadores
      </span>

      {/* <NavItem to="/" text="Desafíos" main={true} /> */}
    </div>
  );
}

export default NavCol;
