import { useState } from 'react';
import './App.css';
import Inicio from './components/Inicio';
import NombresJugadores from './components/NombresJugadores';
import Tematica from './components/Tematica';
import Cards from './components/Cards';
import { palabrasPorTematica } from "./data/palabras";

function App() {

const [pantalla, setPantalla] = useState("inicio");

  const cambiarPantalla = (nuevaPantalla) => {
  setPantalla(nuevaPantalla);
};

  const [numJugadores, setNumJugadores] = useState(0);
  const [numImpostores, setNumImpostores] = useState(0);
  const [nombres, setNombres] = useState([]);
  const [tematica, setTematica] = useState("");

  //Boton ir para atras
  const handleAtras = () => {
  if (pantalla === "nombres") cambiarPantalla("inicio");
  else if (pantalla === "tematica") cambiarPantalla("nombres");
 
  //Boton para volver jugar en la ultima page
   else if (pantalla === "juego") {
    // Reiniciamos todos los estados para volver a jugar
    setNombres([]);
    setNumJugadores(0);
    setNumImpostores(0);
    setTematica("");
    cambiarPantalla("inicio");
  }
};

    //Cambiar de pantallas
  const handleInicio = (jugadores, impostores) => {
    setNumJugadores(jugadores);
    setNumImpostores(impostores);
    setPantalla("nombres"); // cambia a la pantalla de nombres
  };

// Cuando actualices nombres
const handleNombres = (listaNombres) => {
  setNombres(listaNombres);
  setPantalla("tematica");
};

// Cuando selecciones temática
const handleTematica = (temaElegido) => {
  setTematica(temaElegido);
  setPantalla("juego"); // ahora pasamos a la pantalla de juego
};

  return (
    <>
      {pantalla === "inicio" && (
        <Inicio onContinuar={handleInicio} />
      )}

      {pantalla === "nombres" && (
        <NombresJugadores 
          numJugadores={numJugadores} 
          numImpostores={numImpostores} 
          onContinuar={handleNombres} 
          onAtras={handleAtras}
        />
      )}
        {pantalla === "tematica" && (
        <Tematica  onSeleccion={handleTematica}
        onAtras={handleAtras}/>
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
