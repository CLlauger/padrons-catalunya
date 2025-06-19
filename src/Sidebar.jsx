import React, { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import "./Sidebar.css";
import poblacions from "./poblacions.json";

const Sidebar = (props) => {
  const { poblacio, setPoblacio } = props;

  const [menuReduit, setMenuReduit] = useState(false);

  return (
    <div className={`sidebar ${menuReduit ? "reduida" : "expandida"}`}>
      <button
        className="toggle-menu"
        onClick={() => setMenuReduit((v) => !v)}
      >
        {menuReduit ? <Menu size={20} /> : <><ChevronLeft size={20} /><span className="toggle-text">Amagar</span></>}
      </button>
      <h2 className="sidebar-title" onClick={() => setPoblacio(undefined)}>Índex de llocs</h2>
      <ul className="sidebar-menu">
        {
            poblacions.map((opcio, index) => (
            <li
                key={index}
                className={poblacio === opcio.nom ? "selected" : ""}
                onClick={() => {
                  setPoblacio(opcio);
                }}
            >
                {opcio.nom}
            </li>
        ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;