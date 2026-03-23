import { COLORS } from "../styles/colors";

export default function AlertCard({ report, isNew }) {
  const isHigh = report.severity === "alta";

  return (
    <div
      style={{
        background: isNew ? `rgba(0,212,170,0.06)` : COLORS.card,
        border: `1px solid ${isNew ? COLORS.accent + "55" : isHigh ? COLORS.warn + "33" : COLORS.cardBorder}`,
        borderRadius: 14,
        padding: "14px",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
      role="article"
      aria-label={`Alerta: ${report.type} en ${report.location}`}
    >
      <div
        style={{
          fontSize: 28,
          width: 44,
          height: 44,
          background: COLORS.warnSoft,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {report.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          {report.type}
          {isNew && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                background: COLORS.accentSoft,
                color: COLORS.accent,
                border: `1px solid ${COLORS.accent}44`,
                borderRadius: 6,
                padding: "1px 6px",
                letterSpacing: 0.3,
              }}
            >
              NUEVO
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>📍 {report.location}</div>
        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{report.time}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: isHigh ? COLORS.warn : "#FBBF24",
          }}
          aria-label={`Severidad ${report.severity}`}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: isHigh ? COLORS.warn : "#FBBF24",
            textTransform: "uppercase",
            letterSpacing: 0.5,
          }}
        >
          {isHigh ? "Alta" : "Media"}
        </span>
      </div>
    </div>
  );
}
