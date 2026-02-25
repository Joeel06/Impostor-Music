import { useState } from "react";
import './Inicio.css';

function Inicio({ onContinuar, numJugadoresInicial = "", numImpostoresInicial = "" }) {
  const [numJugadores, setNumJugadores] = useState(numJugadoresInicial !== 0 ? String(numJugadoresInicial) : "");
  const [numImpostores, setNumImpostores] = useState(numImpostoresInicial !== 0 ? String(numImpostoresInicial) : "");
  const [error, setError] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();

    const jugadores = parseInt(numJugadores, 10);
    const impostores = parseInt(numImpostores, 10);

    if (
      jugadores > 2 &&
      jugadores < 10 &&
      impostores > 0 &&
      impostores < 6 &&
      impostores <= jugadores
    ) {
      setError("");
      onContinuar(jugadores, impostores);
    } else {
      setError("Por favor, ingresa números válidos");
    }
  };

  const handleNumJugadores = (e) => {
    setNumJugadores(e.target.value);
    const val = parseInt(e.target.value, 10);
    if (val > 2 && val < 10) setError("");
  };

  const handleNumImpostores = (e) => {
    setNumImpostores(e.target.value);
    const val = parseInt(e.target.value, 10);
    if (val > 0 && val <= parseInt(numJugadores || 0, 10)) setError("");
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "linear-gradient(160deg, #0a0a12 0%, #0f0f1e 45%, #12090d 100%)" }}>
      <div className="flex-1 flex flex-col justify-center items-center gap-6 px-4">
        <h1 className="text-7xl">🕵</h1>
        <h1 className="text-3xl font-bold text-white text-center">Juego del Impostor</h1>
        <h2 className="text-2xl font-bold text-white text-center">Versión <span className="text-purple-500">música 🎵</span></h2>
        <form onSubmit={handleSubmit} className="bg-white/80 rounded-2xl shadow-xl max-w-sm w-full p-6 flex flex-col gap-4">
          <h2 className="text-gray-800 font-semibold">Número de jugadores:</h2>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            type="number"
            placeholder="3"
            value={numJugadores}
            onChange={handleNumJugadores}
          />

          <h2 className="text-gray-800 font-semibold">Número de impostores:</h2>
          <input
            className="bg-gray-200 rounded-lg p-2 w-full"
            type="number"
            placeholder="1"
            value={numImpostores}
            onChange={handleNumImpostores}
          />

          <input
            type="submit"
            value="Continuar"
            className="bg-purple-900 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition w-full mt-2"
          />
        </form>

        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </div>

      <footer className="w-full py-4 flex justify-center items-center">
        <p className="text-gray-400 text-sm">
          Desarrollado por <span className="text-purple-500 font-semibold">Joel</span>
        </p>
      </footer>
    </div>
  );
}

export default Inicio;