import { COLORS } from "../styles/colors";
import AlertCard from "../components/AlertCard";
import { REPORTS } from "../data/reports";

export default function AlertsTab() {
  const highCount = REPORTS.filter((r) => r.severity === "alta").length;

  return (
    <section>
      {/* Summary banner */}
      {highCount > 0 && (
        <div
          style={{
            background: "rgba(255,107,53,0.1)",
            border: `1px solid rgba(255,107,53,0.3)`,
            borderRadius: 14,
            padding: "12px 16px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
          role="alert"
          aria-live="polite"
        >
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.warn }}>
              {highCount} alerta{highCount > 1 ? "s" : ""} de severidad alta en tu zona
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
              Planifica tu ruta con cuidado
            </div>
          </div>
        </div>
      )}

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
        Reportes recientes en tu zona
      </h2>

      {REPORTS.map((report) => (
        <AlertCard key={report.id} report={report} />
      ))}

      <div
        style={{
          textAlign: "center",
          padding: "16px 0 8px",
          fontSize: 12,
          color: COLORS.textMuted,
        }}
      >
        Actualizado hace 5 minutos
      </div>
    </section>
  );
}
