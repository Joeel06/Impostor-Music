import { useState } from "react";

function NombresJugadores({ numJugadores, numImpostores, nombresIniciales, onContinuar, onAtras }) {
  const [nombres, setNombres] = useState(
    nombresIniciales && nombresIniciales.length === numJugadores
      ? nombresIniciales
      : Array.from({ length: numJugadores }, (_, i) => `Jugador ${i + 1}`)
  );
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    const copia = [...nombres];
    copia[index] = value;
    setNombres(copia);
  };

  const handleSubmit = () => {
    if (nombres.some((n) => n.trim() === "")) {
       setError("Por favor, ingresa todos los nombres");
      return;
    }
    else{
         setError("");
         onContinuar(nombres);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "linear-gradient(160deg, #0a0a12 0%, #0f0f1e 45%, #12090d 100%)" }}>
      <div className="flex-1 flex flex-col justify-center items-center gap-6 px-4">

        <button
        onClick={onAtras}
         className="absolute top-4 left-4 mt-4 bg-purple-900/50 text-white py-2 px-4 rounded-lg hover:bg-purple-900"
        > ← Atrás </button>

        
        <h1 className="text-7xl">🎵👾</h1>
        <h2 className="text-2xl font-bold mb-4 text-white">Nombres de los jugadores</h2>
        <div className="bg-white/80 rounded-2xl shadow-xl max-w-sm w-full p-6 flex flex-col gap-4 text-black">
      {nombres.map((nombre, i) => (
  <input
    key={i}
    placeholder={`Jugador ${i + 1}`}
    value={nombre}
    maxLength={"10"}
    onChange={(e) => handleChange(i, e.target.value)}
    className="bg-gray-200 rounded-lg p-2 w-full"
  />
))}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-purple-900 text-white py-2 px-4 rounded hover:bg-purple-700"
      >
        Continuar
      </button>
    </div>

      {/* Mensaje de error */}
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

export default NombresJugadores;