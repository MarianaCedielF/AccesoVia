import { COLORS } from "../styles/colors";
import MapPlaceholder from "../components/MapPlaceholder";
import RouteCard from "../components/RouteCard";
import { ROUTES } from "../data/routes";

export default function RoutesTab({ query, onQueryChange, listening, onToggleListen, onStartRoute }) {
  const filtered = ROUTES.filter(
    (r) => query === "" || r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Search bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: COLORS.card,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 16,
          padding: "12px 16px",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <span style={{ fontSize: 16 }} aria-hidden="true">🔍</span>
        <input
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: COLORS.text,
            fontSize: 15,
            fontFamily: "inherit",
          }}
          placeholder="¿A dónde vas hoy?"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Buscar destino"
          type="search"
        />
        <button
          className={listening ? "mic-active" : ""}
          style={{
            background: listening ? "rgba(0,212,170,0.25)" : COLORS.accentSoft,
            border: "none",
            borderRadius: 10,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 16,
            position: "relative",
            transition: "background 0.2s",
          }}
          onClick={onToggleListen}
          aria-label={listening ? "Detener reconocimiento de voz" : "Activar comando de voz"}
          aria-pressed={listening}
        >
          {listening ? "🔴" : "🎙️"}
        </button>
      </div>

      {listening && (
        <div
          style={{
            textAlign: "center",
            color: COLORS.accent,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 16,
            padding: "10px",
            background: COLORS.accentSoft,
            borderRadius: 10,
          }}
          role="status"
          aria-live="polite"
        >
          🎙️ Escuchando... di tu destino
        </div>
      )}

      <MapPlaceholder />

      <section style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.textMuted,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            marginBottom: 12,
            margin: "0 0 12px",
          }}
        >
          Rutas accesibles sugeridas
        </h2>

        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "32px 16px",
              color: COLORS.textMuted,
              fontSize: 14,
            }}
            role="status"
          >
            No se encontraron rutas para "{query}"
          </div>
        ) : (
          filtered.map((route) => (
            <RouteCard key={route.id} route={route} onStart={onStartRoute} />
          ))
        )}
      </section>
    </>
  );
}
