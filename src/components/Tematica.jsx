import { useState } from "react";

function Tematica({ onSeleccion, onAtras }) {
  const [seleccion, setSeleccion] = useState("");

  const tematicas = [
    { id: "juego", nombre: "Juego 🎮" },
    { id: "musica", nombre: "Año / Música 📆" },
    { id: "deportes", nombre: "Deportes ⚽" },
    { id: "tendencia", nombre: "Tendencias 🔥" },
    { id: "genero", nombre: "Género 🎼" },
    { id: "artistasFlow", nombre: "Artistas 🎤" },
    { id: "futbolFamosos", nombre: "Futbolistas ⭐" },
    { id: "aleatorio", nombre: "Aleatorio 🎲" },
  ];

  const handleClick = (id) => {
    setSeleccion(id);
  };

  const handleContinuar = () => {
    if (!seleccion) return; // no avanzar si no hay selección
    onSeleccion(seleccion); // notifica a App.jsx
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: "linear-gradient(160deg, #0a0a12 0%, #0f0f1e 45%, #12090d 100%)" }}>
      <div className="flex-1 flex flex-col justify-center items-center gap-6 px-4">

        <button
          onClick={onAtras}
          className="absolute top-4 left-4 mt-4 bg-purple-900/50 text-white py-2 px-4 rounded-lg hover:bg-purple-900"
        >
          ← Atrás
        </button>

        <h1 className="text-7xl">🌍</h1>
        <h2 className="text-3xl font-bold mb-4 text-white">Elige Temática:</h2>

        <div className="bg-white/80 rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-wrap justify-center gap-4">
          {tematicas.map((tema) => (
            <button
              key={tema.id}
              onClick={() => handleClick(tema.id)}
              className={`py-2 px-4 rounded-lg font-semibold transition ${
                seleccion === tema.id
                  ? "bg-purple-700 text-white shadow-lg"
                  : "bg-purple-200 text-purple-900 hover:bg-purple-300"
              }`}
            >
              {tema.nombre}
            </button>
          ))}

          <input
            type="submit"
            value="Continuar"
            onClick={handleContinuar}
            className="bg-purple-900 text-white py-2 rounded-lg cursor-pointer hover:bg-purple-700 transition w-full mt-2"
          />
        </div>
      </div>

      <footer className="w-full py-4 flex justify-center items-center">
        <p className="text-gray-400 text-sm">
          Desarrollado por <span className="text-purple-500 font-semibold">Joel</span>
        </p>
      </footer>
    </div>
  );
}

export default Tematica;