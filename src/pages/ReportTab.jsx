import { useState } from "react";
import { COLORS } from "../styles/colors";
import { ISSUE_TYPES } from "../data/routes";

export default function ReportTab({ listening, onToggleListen }) {
  const [reportType, setReportType] = useState("");
  const [reportLoc, setReportLoc] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!reportType) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReportType("");
      setReportLoc("");
      setDescription("");
    }, 2500);
  };

  if (submitted) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: COLORS.accentSoft,
          borderRadius: 20,
          border: `1px solid ${COLORS.accent}44`,
        }}
        role="status"
        aria-live="assertive"
      >
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent }}>¡Reporte enviado!</div>
        <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8, lineHeight: 1.5 }}>
          Gracias por tu aporte.<br />Ayudas a hacer Bogotá más accesible para todos.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: COLORS.textMuted,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          marginBottom: 20,
          margin: "0 0 20px",
        }}
      >
        Reportar obstáculo o problema
      </h2>

      {/* Issue type selector */}
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            fontSize: 13,
            color: COLORS.textMuted,
            marginBottom: 10,
            display: "block",
            fontWeight: 600,
          }}
        >
          Tipo de problema *
        </label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
          role="group"
          aria-label="Tipo de problema"
        >
          {ISSUE_TYPES.map(({ label, icon }) => {
            const selected = reportType === label;
            return (
              <button
                key={label}
                style={{
                  padding: "12px 8px",
                  borderRadius: 12,
                  border: `1px solid ${selected ? COLORS.accent : COLORS.cardBorder}`,
                  background: selected ? COLORS.accentSoft : COLORS.bg,
                  color: selected ? COLORS.accent : COLORS.textMuted,
                  fontSize: 13,
                  fontWeight: selected ? 700 : 500,
                  cursor: "pointer",
                  textAlign: "center",
                  fontFamily: "inherit",
                  transition: "all 0.15s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
                onClick={() => setReportType(label)}
                aria-pressed={selected}
              >
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Location */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="report-location"
          style={{
            fontSize: 13,
            color: COLORS.textMuted,
            marginBottom: 6,
            display: "block",
            fontWeight: 600,
          }}
        >
          Ubicación *
        </label>
        <input
          id="report-location"
          style={{
            width: "100%",
            background: COLORS.bg,
            border: `1px solid ${reportLoc ? COLORS.accent + "66" : COLORS.cardBorder}`,
            borderRadius: 12,
            padding: "12px 14px",
            color: COLORS.text,
            fontSize: 14,
            fontFamily: "inherit",
            boxSizing: "border-box",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          placeholder="Ej: Cra 15 con Cll 85, cerca del semáforo"
          value={reportLoc}
          onChange={(e) => setReportLoc(e.target.value)}
          aria-label="Ubicación del problema"
          required
        />
      </div>

      {/* Description */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="report-description"
          style={{
            fontSize: 13,
            color: COLORS.textMuted,
            marginBottom: 6,
            display: "block",
            fontWeight: 600,
          }}
        >
          Descripción adicional
        </label>
        <textarea
          id="report-description"
          style={{
            width: "100%",
            background: COLORS.bg,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 12,
            padding: "12px 14px",
            color: COLORS.text,
            fontSize: 14,
            fontFamily: "inherit",
            boxSizing: "border-box",
            outline: "none",
            resize: "vertical",
            minHeight: 80,
          }}
          placeholder="Describe el problema con más detalle (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Descripción adicional del problema"
        />
      </div>

      {/* Voice option */}
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 14px",
          background: listening ? COLORS.accentSoft : COLORS.card,
          borderRadius: 12,
          border: `1px solid ${listening ? COLORS.accent + "44" : COLORS.cardBorder}`,
          transition: "all 0.2s",
        }}
      >
        <button
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
            flexShrink: 0,
            position: "relative",
          }}
          className={listening ? "mic-active" : ""}
          onClick={onToggleListen}
          aria-label={listening ? "Detener grabación de voz" : "Reportar por voz"}
          aria-pressed={listening}
        >
          {listening ? "🔴" : "🎙️"}
        </button>
        <span style={{ fontSize: 13, color: listening ? COLORS.accent : COLORS.textMuted }}>
          {listening ? "Escuchando tu reporte..." : "O reporta por voz"}
        </span>
      </div>

      {/* Submit */}
      <button
        style={{
          width: "100%",
          background: reportType && reportLoc
            ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`
            : COLORS.cardBorder,
          border: "none",
          borderRadius: 14,
          padding: "15px",
          color: reportType && reportLoc ? "#000" : COLORS.textMuted,
          fontSize: 15,
          fontWeight: 800,
          cursor: reportType && reportLoc ? "pointer" : "not-allowed",
          fontFamily: "inherit",
          transition: "all 0.2s",
        }}
        onClick={handleSubmit}
        disabled={!reportType || !reportLoc}
        aria-label="Enviar reporte de accesibilidad"
        aria-disabled={!reportType || !reportLoc}
      >
        📢 Enviar reporte
      </button>

      {!reportType && (
        <p style={{ fontSize: 12, color: COLORS.textMuted, textAlign: "center", marginTop: 8 }}>
          Selecciona el tipo de problema para continuar
        </p>
      )}
    </div>
  );
}
