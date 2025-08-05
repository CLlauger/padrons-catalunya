import React, { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import "./Sidebar.css";
import poblacions from "./poblacions.json";

const Sidebar = (props) => {
  const { poblacio, setPoblacio, setPadrons, setAnySeleccionat } = props;

  const [menuReduit, setMenuReduit] = useState(false);

  const carregarPoblacio = async (lloc) => {
    try {
      setAnySeleccionat(undefined);
      const data = await import(`./dades/${lloc.id}.json`);
      setPoblacio(lloc);
      setPadrons(data.default);
    } catch (error) {
      console.error("[!] Error: no s'ha pogut carregar:", lloc, error);
    }
  };

  return (
    <div className={`sidebar ${menuReduit ? "reduida" : "expandida"}`}>
      <button
        className="toggle-menu"
        onClick={() => setMenuReduit((v) => !v)}
      >
        {menuReduit ? <Menu size={20} /> : <><ChevronLeft size={20} /><span className="toggle-text">Amagar</span></>}
      </button>
      <h2 className="sidebar-title" onClick={() => {setPoblacio(undefined); setPadrons(undefined);}}>Índex de llocs</h2>
      <ul className="sidebar-menu">
        {
            poblacions.map((lloc, index) => (
            <li
                key={index}
                className={poblacio === lloc.nom ? "selected" : ""}
                onClick={() => {
                  carregarPoblacio(lloc);
                }}
            >
                {lloc.nom}
            </li>
        ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;