import { COLORS } from "../styles/colors";

export default function MapPlaceholder() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0D1929, #0A1A2E)",
        borderRadius: 20,
        border: `1px solid ${COLORS.cardBorder}`,
        height: 220,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Mapa de ubicación actual en Bogotá"
      role="img"
    >
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.cardBorder} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cardBorder} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />

      {/* Route lines decoration */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
        viewBox="0 0 430 220"
        preserveAspectRatio="none"
      >
        <polyline points="0,110 80,110 140,70 220,70 280,140 360,140 430,110" stroke={COLORS.accent} strokeWidth="2" fill="none" strokeDasharray="6,4" />
        <polyline points="0,160 60,160 120,100 200,100 260,60 430,60" stroke="#60C9FF" strokeWidth="1.5" fill="none" strokeDasharray="4,6" />
      </svg>

      <div
        className="map-pin"
        style={{
          fontSize: 36,
          zIndex: 1,
          filter: "drop-shadow(0 4px 12px rgba(0,212,170,0.5))",
        }}
      >
        📍
      </div>
      <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700, zIndex: 1, marginTop: 8 }}>
        Tu ubicación · Bogotá, Colombia
      </div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, zIndex: 1, marginTop: 4 }}>
        GPS activo
      </div>
    </div>
  );
}
