import { useState, useEffect } from "react";

function Cards({ nombres, numImpostores, palabras, onAtras }) {
  const [jugadores, setJugadores] = useState([]);
  const [revelado, setRevelado] = useState([]);

  const emojis = ["😎", "🧐", "🤓", "😇", "🤠", "🧙‍♂️", "👻", "🦸‍♂️"];

  useEffect(() => {
    if (!nombres || nombres.length === 0 || !palabras) return;

    const asignarRolesYPals = () => {
      const roles = Array(nombres.length).fill("No eres el impostor");
      const indices = [];

      while (indices.length < numImpostores) {
        const rand = Math.floor(Math.random() * nombres.length);
        if (!indices.includes(rand)) indices.push(rand);
      }
      indices.forEach(i => roles[i] = "Eres el impostor");

      const palabraDelTema = palabras[Math.floor(Math.random() * palabras.length)];

      const jugadoresAsignados = nombres.map((nombre, i) => ({
        nombre,
        rol: roles[i],
        palabra: roles[i] === "No eres el impostor" ? palabraDelTema : "???",
        emoji: emojis[i % emojis.length]
      }));

      setJugadores(jugadoresAsignados);
      setRevelado(Array(nombres.length).fill(false));
    };

    asignarRolesYPals();
  }, [nombres, numImpostores, palabras]);

  const handleRevelar = (index) => {
    const nuevo = [...revelado];
    nuevo[index] = !nuevo[index];
    setRevelado(nuevo);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{
        background: "linear-gradient(160deg, #0a0a12 0%, #0f0f1e 45%, #12090d 100%)"
      }}
    >
      <div className="flex-1 flex flex-col justify-center items-center gap-6 px-4">
        <h1 className="text-7xl mt-5">🎭</h1>
        <h2 className="text-3xl font-bold mb-4 text-white mt-5">Revela tu rol</h2>

        <div className="flex flex-wrap justify-center gap-4 text-white">
          {jugadores.map((jugador, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg w-60 flex flex-col items-center transition"
              style={{
                // Color neutro si no está revelado, color según rol solo si está revelado
                backgroundColor: revelado[index]
                  ? jugador.rol === "Eres el impostor"
                    ? "rgba(255,0,0,0.3)"
                    : "rgba(0,255,0,0.3)"
                  : "rgba(255,255,255,0.1)"
              }}
            >
              <p className="font-semibold text-xl">{jugador.nombre}</p>
              <p className="text-4xl mt-2">{jugador.emoji}</p>

              <button
                className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
                onClick={() => handleRevelar(index)}
              >
                {revelado[index] ? "Ocultar rol" : "Mostrar rol"}
              </button>

              {revelado[index] && (
                <div className="mt-2 text-center">
                  <p><strong>{jugador.rol}</strong></p>
                  <p>Palabra: <strong>{jugador.palabra}</strong></p>
                </div>
              )}
            </div>
          ))}
        </div>
               <button
          onClick={onAtras}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Volver a jugar
        </button>
      </div>

      <footer className="w-full py-4 flex justify-center items-center">
        <p className="text-gray-400 text-sm">
          Desarrollado por <span className="text-purple-500 font-semibold">Joel</span>
        </p>
      </footer>
    </div>
  );
}

export default Cards;