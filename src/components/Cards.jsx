import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CARDS_STORAGE_KEY = "impostor_cards_state";

function Cards({ nombres, numImpostores, palabras, onAtras }) {
  const emojis = ["😎", "🧐", "🤓", "😇", "🤠", "🧙‍♂️", "👻", "🦸‍♂️"];

  const buildJugadores = () => {
    try {
      const raw = sessionStorage.getItem(CARDS_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (
          saved.nombres &&
          saved.nombres.join(",") === nombres.join(",") &&
          saved.numImpostores === numImpostores
        ) {
          return saved.jugadores;
        }
      }
    } catch {}
    return null;
  };

  const generarJugadores = () => {
    if (!nombres || nombres.length === 0 || !palabras) return [];

    const roles = Array(nombres.length).fill("No eres el impostor");
    const indices = [];
    while (indices.length < numImpostores) {
      const rand = Math.floor(Math.random() * nombres.length);
      if (!indices.includes(rand)) indices.push(rand);
    }
    indices.forEach((i) => (roles[i] = "Eres el impostor"));

    const palabraDelTema = palabras[Math.floor(Math.random() * palabras.length)];

    return nombres.map((nombre, i) => ({
      nombre,
      rol: roles[i],
      palabra: roles[i] === "No eres el impostor" ? palabraDelTema : "???",
      emoji: emojis[i % emojis.length],
    }));
  };

  const [jugadores] = useState(() => {
    const cached = buildJugadores();
    if (cached) return cached;
    const nuevos = generarJugadores();
    try {
      sessionStorage.setItem(
        CARDS_STORAGE_KEY,
        JSON.stringify({ nombres, numImpostores, jugadores: nuevos })
      );
    } catch {}
    return nuevos;
  });

  const [revelado, setRevelado] = useState(Array(jugadores.length).fill(false));

  const handleRevelar = (index) => {
    const nuevo = [...revelado];
    nuevo[index] = !nuevo[index];
    setRevelado(nuevo);
  };

  const handleVolverAJugar = () => {
    // Limpiamos el cache para que la próxima partida genere nuevos roles y palabra
    sessionStorage.removeItem(CARDS_STORAGE_KEY);
    onAtras();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(160deg, #0a0a12 0%, #0f0f1e 45%, #12090d 100%)",
      }}
    >
      <div className="flex-1 flex flex-col justify-center items-center gap-6 px-4">
        <h1 className="text-7xl mt-5">🎭</h1>
        <h2 className="text-3xl font-bold mb-4 text-white mt-5">Revela tu rol</h2>

        <div className="flex flex-wrap justify-center gap-6 text-white">
          {jugadores.map((jugador, index) => {
            const esImpostor = jugador.rol === "Eres el impostor";

            return (
              <motion.div
                key={index}
                className="w-60 h-80 perspective cursor-pointer"
                onClick={() => handleRevelar(index)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    rotateY: revelado[index] ? 180 : 0,
                    borderColor: revelado[index] ? "#A855F7" : "#8B5CF6",
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full rounded-xl border shadow-lg"
                  style={{
                    transformStyle: "preserve-3d",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  }}
                >
                  {/* FRENTE */}
                  <div
                    className="absolute w-full h-full rounded-xl flex flex-col items-center justify-center p-4"
                    style={{
                      backfaceVisibility: "hidden",
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <p className="text-xl font-semibold">{jugador.nombre}</p>
                    <motion.p
                      className="text-5xl mt-4"
                      animate={{ rotate: revelado[index] ? 360 : 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {jugador.emoji}
                    </motion.p>
                    <p className="mt-4 text-sm opacity-70 text-center text-purple-400">Click para revelar</p>
                  </div>

                  {/* REVERSO */}
                  <div
                    className="absolute w-full h-full rounded-xl flex flex-col items-center justify-center p-4"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: esImpostor ? "rgba(220,38,38,0.35)" : "rgba(22,163,74,0.3)",
                      boxShadow: esImpostor
                        ? "0 0 20px rgba(220,38,38,0.3)"
                        : "0 0 20px rgba(22,163,74,0.25)",
                    }}
                  >
                    <p className="text-xl font-semibold">{jugador.nombre}</p>
                    <p className="text-5xl mt-2">{jugador.emoji}</p>
                    <AnimatePresence>
                      {revelado[index] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="text-center mt-2"
                        >
                          <p className={`text-sm font-bold ${esImpostor ? "text-red-300" : "text-green-300"}`}>
                            {jugador.rol}
                          </p>
                          <p className="text-xs text-white/80 mt-1">
                            Palabra: <strong className="text-white">{jugador.palabra}</strong>
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={handleVolverAJugar}
          className="mt-6 bg-purple-900 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          Volver a jugar
        </button>
      </div>

      <footer className="w-full py-4 flex justify-center">
        <p className="text-gray-400 text-sm">
          Desarrollado por <span className="text-purple-500 font-semibold">Joel</span>
        </p>
      </footer>
    </div>
  );
}

export default Cards;