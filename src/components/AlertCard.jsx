import { COLORS } from "../styles/colors";

export default function AlertCard({ report }) {
  const isHigh = report.severity === "alta";

  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${isHigh ? COLORS.warn + "33" : COLORS.cardBorder}`,
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
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{report.type}</div>
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
