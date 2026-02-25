import { useState } from "react";

const pasos = [
  {
  numero: "01",
  emoji: "👥",
  titulo: "Elige jugadores e impostores",
  descripcion: "Configura cuántos jugadores participarán y cuántos serán impostores. La partida admite entre 3 y 9 jugadores.",
},
{
  numero: "02",
  emoji: "📫",
  titulo: "Elige la temática",
  descripcion: "Selecciona la temática que prefiráis para la partida.",
},
{
  numero: "03",
  emoji: "🃏",
  titulo: "Revela tu rol",
  descripcion: "Cada jugador toma su móvil y mira su carta en secreto. Los jugadores normales verán una palabra secreta, mientras que el impostor solo verá \"???\".",
},
{
  numero: "04",
  emoji: "🎵",
  titulo: "Pon una canción",
  descripcion: "Por turnos, cada jugador pone una canción relacionada con la palabra secreta. El impostor deberá elegir una canción convincente sin conocerla.",
},
{
  numero: "05",
  emoji: "🗳️",
  titulo: "Vota",
  descripcion: "Todos los jugadores votan al mismo tiempo señalando a quien creen que es el impostor. El jugador más votado queda eliminado y se revela su rol.",
},
{
  numero: "06",
  emoji: "🏆",
  titulo: "¿Quién gana?",
  descripcion: "Los jugadores ganan si eliminan al impostor. El impostor gana si sobrevive a la votación o si, tras ser descubierto, logra adivinar la palabra secreta.",
},
];

function ComoSeJuega({ onAtras }) {
  const [pasoActivo, setPasoActivo] = useState(null);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #0a0a12 0%, #0f0f1e 45%, #12090d 100%)" }}
    >
      <div className="flex-1 flex flex-col items-center px-4 py-10 gap-8">

        <button
          onClick={onAtras}
          className="self-start bg-purple-900/50 text-white py-2 px-4 rounded-lg hover:bg-purple-900 transition"
        >
          ← Atrás
        </button>

        <div className="text-center">
          <h1 className="text-7xl">📖</h1>
          <h2 className="text-3xl font-bold text-white mt-4">¿Cómo se juega?</h2>
        </div>

        <div className="w-full max-w-lg flex flex-col gap-3">
          {pasos.map((paso, i) => (
            <div
              key={paso.numero}
              onClick={() => setPasoActivo(pasoActivo === i ? null : i)}
              className="cursor-pointer rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${pasoActivo === i ? "#7C3AED" : "rgba(255,255,255,0.08)"}`,
              }}
            >
              <div className="flex items-center gap-4 p-4">
                <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{ background: "rgba(124,58,237,0.2)" }}>
                  {paso.emoji}
                </span>
                <div className="flex-1">
                  <p className="text-purple-400 text-xs font-bold tracking-widest">PASO {paso.numero}</p>
                  <p className="text-white font-semibold">{paso.titulo}</p>
                </div>
                <span className="text-purple-400 text-lg transition-transform duration-300"
                  style={{ transform: pasoActivo === i ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>
                  ↓
                </span>
              </div>

              {pasoActivo === i && (
                <div
                  className="px-5 pb-5 text-white/70 text-sm leading-relaxed"
                  style={{ borderTop: "1px solid rgba(124,58,237,0.3)", paddingTop: "12px" }}
                >
                  {paso.descripcion}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onAtras}
          className="bg-purple-900 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
        >
          ¡Entendido, a jugar! 🎮
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

export default ComoSeJuega;