import { COLORS } from "../styles/colors";

export default function FloatingButton({ onClick, audioActive }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 0,
        right: 0,
        maxWidth: 430,
        margin: "0 auto",
        padding: "0 16px",
        boxSizing: "border-box",
        zIndex: 40,
      }}
    >
      <button
        style={{
          width: "100%",
          background: audioActive
            ? `linear-gradient(135deg, ${COLORS.warn} 0%, #FF8C42 100%)`
            : `linear-gradient(135deg, ${COLORS.accent} 0%, #00B4D8 100%)`,
          border: "none",
          borderRadius: 18,
          padding: "16px",
          color: "#000",
          fontSize: 15,
          fontWeight: 800,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          boxShadow: audioActive
            ? `0 8px 32px rgba(255,107,53,0.4)`
            : `0 8px 32px rgba(0,212,170,0.4)`,
          transition: "all 0.3s ease",
          fontFamily: "inherit",
        }}
        onClick={onClick}
        aria-label={audioActive ? "Desactivar navegación con audio" : "Activar navegación con audio"}
        aria-pressed={audioActive}
      >
        <span style={{ fontSize: 20 }}>{audioActive ? "🔇" : "🔊"}</span>
        {audioActive ? "Audio activo — toca para silenciar" : "Activar navegación con audio"}
      </button>
    </div>
  );
}
