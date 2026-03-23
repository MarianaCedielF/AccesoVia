import { COLORS } from "../styles/colors";
import AlertCard from "../components/AlertCard";

export default function AlertsTab({ reports, newCount }) {
  const highCount = reports.filter((r) => r.severity === "alta").length;

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

      {reports.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 16px",
            color: COLORS.textMuted,
            fontSize: 14,
          }}
          role="status"
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <div style={{ fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>Sin alertas activas</div>
          <div>Tu zona está despejada. ¡Buen camino!</div>
        </div>
      ) : (
        reports.map((report, i) => (
          <AlertCard key={report.id} report={report} isNew={i < newCount} />
        ))
      )}

      {reports.length > 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "16px 0 8px",
            fontSize: 12,
            color: COLORS.textMuted,
          }}
        >
          {newCount > 0 ? `${newCount} reporte${newCount > 1 ? "s" : ""} recién enviado${newCount > 1 ? "s" : ""}` : "Actualizado hace 5 minutos"}
        </div>
      )}
    </section>
  );
}
