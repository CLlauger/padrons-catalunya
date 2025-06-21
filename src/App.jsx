import React, { useState } from "react";
import Select from 'react-select';
import Sidebar from "./Sidebar";
import "./styles.css";

const App = () => {
  const [poblacio, setPoblacio] = useState();
  const [anySeleccionat, setAnySeleccionat] = useState(undefined);
  const [carrer, setCarrer] = useState();
  const [valorSelector, setValorSelector] = useState();

  const [pagina, setPagina] = useState(0);
  const [totalPagines, setTotalPagines] = useState(0);

  const pagEnrere = () => {
    if (pagina > 0) setPagina(pagina - 1);
  }
  const pagEndavant = () => {
    if (pagina < carrer.pagines?.length - 1) setPagina(pagina + 1);
  }
  const pagInicial = () => {
    setPagina(0);
  }
  const pagFinal = () => {
    setPagina(carrer.pagines?.length-1);
  }

  return (
    <div className="layout">
      <Sidebar poblacio={poblacio} setPoblacio={setPoblacio} />
      <div className="main-content">
        <h1>Índex de padrons i censos municipals de les comarques gironines</h1>
        <p>Selecciona una població del menú lateral de l'esquerra per consultar-ne els padrons i censos disponibles.</p>
        {poblacio != undefined ?
        <div>
            <h2>{poblacio?.nom}</h2>
            {
                poblacio.anys.length > 0 ?
                <center>
                  {/* ANYS */}
                  <div className="seccions">
                    {
                      poblacio.anys.map((a, index) => (
                        <button title={a.any} key={index} className={`boto-seccio ${anySeleccionat === a ? "boto-actiu" : ""}`}
                          onClick={() => {
                            setAnySeleccionat(a);
                            let nouCarrer = a.carrers[0];
                            setCarrer(nouCarrer);
                            setValorSelector({value: nouCarrer, label: `${nouCarrer.via}${nouCarrer.nom}`});
                            setPagina(0);
                            setTotalPagines(nouCarrer.pagines.length);
                          }}>
                          <h3>{a.any}<br/><small>({a.categoria})</small></h3>
                        </button>
                      ))
                    }
                  </div>
                  {/* CARRERS */}
                  {anySeleccionat != undefined ?
                  <div>
                    <Select
                      value={valorSelector}
                      defaultValue={{value: carrer, label: `${carrer.via}${carrer.nom}`}}
                      options={anySeleccionat.carrers.flatMap((c) => {
                        let nom_es = c.nom_es != "" ? ` (${c.nom_es})` : "";
                        let label = `${c.via}${c.nom}${nom_es}`;
                        return {value: c, label: label}
                      })}
                      onChange={(opcio) => {
                        let c = opcio.value;
                        setCarrer(c);
                        setValorSelector(() => {
                          let nom_es = c.nom_es != "" ? ` (${c.nom_es})` : "";
                          let label = `${c.via}${c.nom}${nom_es}`;
                          return {value: c, label: label}
                        });
                        setPagina(0);
                        setTotalPagines(c.pagines.length);
                      }}
                      placeholder="Selecciona una via"
                      isSearchable
                      styles={{
                        container: (base) => ({
                          ...base,
                          width: '50%',
                        }),
                        control: (base) => ({
                          ...base,
                          backgroundColor: 'black',
                          color: 'white',
                          borderColor: '#444',
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: 'white',
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: '#111',
                          color: 'white',
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused ? '#333' : '#111',
                          color: 'white',
                          cursor: 'pointer',
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: '#ccc',
                        }),
                        input: (base) => ({
                          ...base,
                          color: 'white',
                        }),
                      }}
                    />
                    {/* PAGINACIÓ */}
                    <div className="paginacio">
                      <button title="Anar a la primera pàgina" onClick={pagInicial} className="boto-paginacio">
                        ⏮️
                      </button>
                      <button title="Anar a la pàgina anterior" onClick={pagEnrere} className="boto-paginacio">
                        ⬅️
                      </button>
                      <span style={{ minWidth: "3rem", textAlign: "center" }}>
                        <h3>{pagina+1} / {totalPagines}</h3>
                      </span>
                      <button title="Anar a la pàgina següent" onClick={pagEndavant} className="boto-paginacio">
                        ➡️
                      </button>
                      <button title="Anar a l'última pàgina" onClick={pagFinal} className="boto-paginacio">
                        ⏭️
                      </button>
                    </div>
                    {/* IMATGE */}
                    {
                      carrer != undefined ?
                        poblacio.arxiu == "AMGi" ?
                        <iframe width="95%" style={{height: "100vh"}} src={poblacio.ruta.replace("[id]", anySeleccionat.id).replace("[p]", carrer.pagines[pagina])}></iframe>
                        :
                        <a href={`#`} target="_blank">
                          <img width="95%" src={`#`}></img>
                        </a>
                      :
                      ""
                    }
                  </div>
                  :
                  ""
                  }
                </center>
                : "Encara no hi ha padrons per aquesta població"
            }
        </div>
        : ""}
      </div>
    </div>
  );
};

export default App;