import { COLORS } from "../styles/colors";

export default function RouteCard({ route, onStart }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${route.accessible ? COLORS.cardBorder : COLORS.warn + "44"}`,
        borderRadius: 16,
        padding: "16px",
        marginBottom: 10,
        transition: "all 0.2s",
      }}
      role="article"
      aria-label={`Ruta: ${route.name}`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 600, flex: 1, marginRight: 8, lineHeight: 1.4 }}>
          {route.name}
        </div>
        <span
          style={{
            background: route.accessible ? "rgba(52,211,153,0.15)" : COLORS.warnSoft,
            color: route.accessible ? COLORS.ok : COLORS.warn,
            border: `1px solid ${route.accessible ? COLORS.ok + "44" : COLORS.warn + "44"}`,
            borderRadius: 8,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {route.accessible ? "✓ Accesible" : "⚠️ Obstáculos"}
        </span>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <span style={{ fontSize: 13, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
          🕐 {route.time}
        </span>
        <span style={{ fontSize: 13, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
          📏 {route.distance}
        </span>
        {route.hazards > 0 && (
          <span style={{ fontSize: 13, color: COLORS.warn, display: "flex", alignItems: "center", gap: 4 }}>
            ⚠️ {route.hazards} alerta{route.hazards > 1 ? "s" : ""}
          </span>
        )}
        <button
          style={{
            marginLeft: "auto",
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
            border: "none",
            borderRadius: 10,
            padding: "7px 14px",
            color: "#000",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
          onClick={() => onStart(route)}
          aria-label={`Navegar por ruta ${route.name}`}
        >
          Navegar →
        </button>
      </div>
    </div>
  );
}
