import { useState, useEffect } from 'react';
import './App.css';
import Inicio from './components/Inicio';
import NombresJugadores from './components/NombresJugadores';
import Tematica from './components/Tematica';
import Cards from './components/Cards';
import { palabrasPorTematica } from "./data/palabras";

const STORAGE_KEY = "impostor_game_state";

function App() {
  const savedState = (() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [pantalla, setPantalla] = useState(savedState?.pantalla || "inicio");
  const [numJugadores, setNumJugadores] = useState(savedState?.numJugadores || 0);
  const [numImpostores, setNumImpostores] = useState(savedState?.numImpostores || 0);
  const [nombres, setNombres] = useState(savedState?.nombres || []);
  const [tematica, setTematica] = useState(savedState?.tematica || "");

  useEffect(() => {
    const state = { pantalla, numJugadores, numImpostores, nombres, tematica };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [pantalla, numJugadores, numImpostores, nombres, tematica]);

  const handleAtras = () => {
    if (pantalla === "nombres") setPantalla("inicio");
    else if (pantalla === "tematica") setPantalla("nombres");
    else if (pantalla === "juego") {
      setPantalla("inicio");
    }
  };

  const handleInicio = (jugadores, impostores) => {
    if (jugadores !== numJugadores) setNombres([]);
    setNumJugadores(jugadores);
    setNumImpostores(impostores);
    setPantalla("nombres");
  };

  const handleNombres = (listaNombres) => {
    setNombres(listaNombres);
    setPantalla("tematica");
  };

  const handleTematica = (temaElegido) => {
    setTematica(temaElegido);
    setPantalla("juego");
  };

  return (
    <>
      {pantalla === "inicio" && (
        <Inicio
          onContinuar={handleInicio}
          numJugadoresInicial={numJugadores || ""}
          numImpostoresInicial={numImpostores || ""}
        />
      )}

      {pantalla === "nombres" && (
        <NombresJugadores
          numJugadores={numJugadores}
          numImpostores={numImpostores}
          nombresIniciales={nombres}
          onContinuar={handleNombres}
          onAtras={handleAtras}
        />
      )}

      {pantalla === "tematica" && (
        <Tematica onSeleccion={handleTematica} onAtras={handleAtras} />
      )}

      {pantalla === "juego" && nombres.length > 0 && (
        <Cards
          nombres={nombres}
          numImpostores={numImpostores}
          palabras={palabrasPorTematica[tematica]}
          onAtras={handleAtras}
        />
      )}
    </>
  );
}

export default App;