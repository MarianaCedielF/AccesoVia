import { useState, useEffect, useRef } from "react";

const APP_NAME = "AccesoVía";

const ROUTES = [
  {
    id: 1,
    name: "TransMilenio Portal Norte → Av. Chile",
    distance: "2.3 km",
    time: "18 min",
    accessible: true,
    hazards: 1,
    steps: [
      { id: 1, icon: "🚌", text: "Aborde el articulado en Portal Norte, puerta 2 (rampa disponible)", audio: true },
      { id: 2, icon: "📍", text: "Bájese en estación Calle 100 — sonido de alerta activo", audio: true },
      { id: 3, icon: "⚠️", text: "Precaución: obra en acera derecha por 80 metros", audio: true },
      { id: 4, icon: "🦯", text: "Siga el piso táctil hacia la salida sur", audio: true },
      { id: 5, icon: "✅", text: "Ha llegado a Avenida Chile. Destino alcanzado.", audio: true },
    ],
  },
  {
    id: 2,
    name: "Parque Nacional → Biblioteca Virgilio Barco",
    distance: "3.1 km",
    time: "24 min",
    accessible: true,
    hazards: 0,
    steps: [
      { id: 1, icon: "🚌", text: "Tome el SITP ruta 370 en la Cra 7 con Calle 36", audio: true },
      { id: 2, icon: "📍", text: "Bájese en la parada Av. El Dorado — anuncio sonoro activo", audio: true },
      { id: 3, icon: "🦯", text: "Cruce con semáforo sonoro a su izquierda, 15 metros", audio: true },
      { id: 4, icon: "✅", text: "Ingrese al parque Simón Bolívar. Biblioteca al frente.", audio: true },
    ],
  },
  {
    id: 3,
    name: "La Candelaria → Hospital San Ignacio",
    distance: "1.8 km",
    time: "14 min",
    accessible: false,
    hazards: 3,
    steps: [
      { id: 1, icon: "⚠️", text: "Ruta con 3 obstáculos reportados en aceras", audio: true },
      { id: 2, icon: "🚌", text: "Alternativa: tome el alimentador L45 en Cra 8ª", audio: true },
      { id: 3, icon: "📍", text: "Bájese en Calle 40 sur — personal de apoyo disponible", audio: true },
      { id: 4, icon: "✅", text: "Llegada al Hospital San Ignacio, entrada principal.", audio: true },
    ],
  },
];

const REPORTS = [
  { id: 1, type: "Obstáculo en acera", location: "Cll 72 con Cra 11", time: "Hace 20 min", severity: "alta", icon: "🚧" },
  { id: 2, type: "Semáforo sonoro dañado", location: "Cra 15 con Cll 85", time: "Hace 1 h", severity: "media", icon: "🔔" },
  { id: 3, type: "Rampa bloqueada", location: "Portal 80", time: "Hace 2 h", severity: "alta", icon: "♿" },
  { id: 4, type: "Piso táctil dañado", location: "Estación Calle 100", time: "Hace 3 h", severity: "media", icon: "🦯" },
];

const COLORS = {
  bg: "#0A0F1E",
  card: "#111827",
  cardBorder: "#1E2A3A",
  accent: "#00D4AA",
  accentDark: "#00A882",
  accentSoft: "rgba(0,212,170,0.12)",
  warn: "#FF6B35",
  warnSoft: "rgba(255,107,53,0.12)",
  text: "#E8F0FE",
  textMuted: "#6B7FA3",
  ok: "#34D399",
  white: "#FFFFFF",
};

const styles = {
  appWrapper: {
    background: "#666",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  app: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: COLORS.bg,
    minHeight: "100vh",
    width: "100vw",
    maxWidth: 430,
    color: COLORS.text,
    position: "relative",
    overflowX: "hidden",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: `linear-gradient(135deg, #0A0F1E 0%, #0D1929 100%)`,
    borderBottom: `1px solid ${COLORS.cardBorder}`,
    padding: "20px 20px 0",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    background: `linear-gradient(90deg, ${COLORS.accent}, #60C9FF)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: -0.5,
  },
  accessBtn: {
    background: COLORS.accentSoft,
    border: `1px solid ${COLORS.accent}`,
    borderRadius: 10,
    width: 36,
    height: 36,
    color: COLORS.accent,
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  navTabs: {
    display: "flex",
    gap: 0,
    marginTop: 4,
  },
  tab: (active) => ({
    flex: "1 1 0",
    minWidth: 0,
    padding: "10px 0",
    textAlign: "center",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    color: active ? COLORS.accent : COLORS.textMuted,
    borderBottom: `2px solid ${active ? COLORS.accent : "transparent"}`,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  body: {
    padding: "20px 16px",
    paddingBottom: 120,
    width: "100%",
    boxSizing: "border-box",
    flex: 1,
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: COLORS.card,
    border: `1px solid ${COLORS.cardBorder}`,
    borderRadius: 16,
    padding: "12px 16px",
    gap: 10,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    background: "none",
    border: "none",
    outline: "none",
    color: COLORS.text,
    fontSize: 15,
    fontFamily: "inherit",
  },
  micBtn: {
    background: COLORS.accentSoft,
    border: "none",
    borderRadius: 10,
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLORS.textMuted,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  routeCard: (accessible) => ({
    background: COLORS.card,
    border: `1px solid ${accessible ? COLORS.cardBorder : COLORS.warn + "44"}`,
    borderRadius: 16,
    padding: "16px",
    marginBottom: 10,
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  routeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  routeName: {
    fontSize: 14,
    fontWeight: 600,
    flex: 1,
    marginRight: 8,
    lineHeight: 1.4,
  },
  badge: (accessible) => ({
    background: accessible ? "rgba(52,211,153,0.15)" : COLORS.warnSoft,
    color: accessible ? COLORS.ok : COLORS.warn,
    border: `1px solid ${accessible ? COLORS.ok + "44" : COLORS.warn + "44"}`,
    borderRadius: 8,
    padding: "3px 8px",
    fontSize: 11,
    fontWeight: 700,
    whiteSpace: "nowrap",
  }),
  routeFooter: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  routeMeta: {
    fontSize: 13,
    color: COLORS.textMuted,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  startBtn: {
    marginLeft: "auto",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    border: "none",
    borderRadius: 10,
    padding: "7px 14px",
    color: "#000",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
  },
  reportCard: (severity) => ({
    background: COLORS.card,
    border: `1px solid ${severity === "alta" ? COLORS.warn + "33" : COLORS.cardBorder}`,
    borderRadius: 14,
    padding: "14px",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 12,
  }),
  reportIcon: {
    fontSize: 28,
    width: 44,
    height: 44,
    background: COLORS.warnSoft,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  reportInfo: { flex: 1 },
  reportType: { fontSize: 14, fontWeight: 600, marginBottom: 2 },
  reportLoc: { fontSize: 12, color: COLORS.textMuted },
  reportTime: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  fabContainer: {
    position: "fixed",
    bottom: 20,
    left: 0,
    right: 0,
    maxWidth: 430,
    margin: "0 auto",
    padding: "0 16px",
    boxSizing: "border-box",
    zIndex: 40,
  },
  fab: {
    width: "100%",
    background: `linear-gradient(135deg, ${COLORS.accent} 0%, #00B4D8 100%)`,
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
    boxShadow: `0 8px 32px rgba(0,212,170,0.4)`,
  },
  // Navigation modal styles
  modal: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    zIndex: 100,
    display: "flex",
    alignItems: "flex-end",
  },
  modalContent: {
    background: COLORS.card,
    borderRadius: "24px 24px 0 0",
    width: "100%",
    maxWidth: 430,
    margin: "0 auto",
    padding: "24px 20px 48px",
    maxHeight: "85vh",
    overflowY: "auto",
  },
  modalHandle: {
    width: 40,
    height: 4,
    background: COLORS.cardBorder,
    borderRadius: 2,
    margin: "0 auto 20px",
  },
  stepItem: (active) => ({
    display: "flex",
    gap: 14,
    padding: "14px",
    borderRadius: 14,
    background: active ? COLORS.accentSoft : "transparent",
    border: `1px solid ${active ? COLORS.accent + "44" : "transparent"}`,
    marginBottom: 8,
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  stepIcon: {
    fontSize: 22,
    width: 40,
    height: 40,
    background: COLORS.bg,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepText: {
    fontSize: 14,
    lineHeight: 1.5,
    paddingTop: 4,
  },
  progressBar: {
    height: 4,
    background: COLORS.cardBorder,
    borderRadius: 2,
    marginBottom: 20,
    overflow: "hidden",
  },
  progressFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: `linear-gradient(90deg, ${COLORS.accent}, #00B4D8)`,
    borderRadius: 2,
    transition: "width 0.4s ease",
  }),
  // Report form
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: COLORS.textMuted, marginBottom: 6, display: "block", fontWeight: 600 },
  input: {
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
  },
  optionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  optionBtn: (selected) => ({
    padding: "10px 8px",
    borderRadius: 12,
    border: `1px solid ${selected ? COLORS.accent : COLORS.cardBorder}`,
    background: selected ? COLORS.accentSoft : COLORS.bg,
    color: selected ? COLORS.accent : COLORS.textMuted,
    fontSize: 13,
    fontWeight: selected ? 700 : 500,
    cursor: "pointer",
    textAlign: "center",
  }),
  submitBtn: {
    width: "100%",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    border: "none",
    borderRadius: 14,
    padding: "15px",
    color: "#000",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    marginTop: 8,
  },
  // Map placeholder
  mapPlaceholder: {
    background: `linear-gradient(135deg, #0D1929, #0A1A2E)`,
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
  },
  mapGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(${COLORS.cardBorder} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.cardBorder} 1px, transparent 1px)`,
    backgroundSize: "40px 40px",
    opacity: 0.4,
  },
  mapPin: {
    fontSize: 36,
    zIndex: 1,
    filter: "drop-shadow(0 4px 12px rgba(0,212,170,0.5))",
    animation: "pulse 2s infinite",
  },
  mapLabel: { fontSize: 13, color: COLORS.accent, fontWeight: 700, zIndex: 1, marginTop: 8 },
};

const ISSUE_TYPES = ["Obstáculo en acera", "Semáforo dañado", "Rampa bloqueada", "Piso táctil dañado", "Otro"];

export default function AccesoVia() {
  const [tab, setTab] = useState("rutas");
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [reportType, setReportType] = useState("");
  const [reportLoc, setReportLoc] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [listening, setListening] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [query, setQuery] = useState("");


  const handleStartRoute = (route) => {
    setActiveRoute(route);
    setActiveStep(0);
  };

  const handleNextStep = () => {
    if (activeStep < activeRoute.steps.length - 1) {
      setActiveStep((s) => s + 1);
    } else {
      setActiveRoute(null);
    }
  };

  const handleSubmitReport = () => {
    if (!reportType) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReport(false);
      setReportType("");
      setReportLoc("");
    }, 2000);
  };

  const toggleListen = () => {
    setListening((l) => !l);
    setTimeout(() => setListening(false), 3000);
  };

  return (
    <div style={styles.appWrapper}>
    <div style={{ ...styles.app, ...(highContrast ? { filter: "invert(1) hue-rotate(180deg)" } : {}) }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          background: #0A0F1E;
        }
        ::-webkit-scrollbar { width: 0; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .mic-active::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 10px;
          border: 2px solid #00D4AA;
          animation: ripple 1s infinite;
        }
      `}</style>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.headerTop}>
          <div>
            <div style={styles.logo}>{APP_NAME}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>Bogotá accesible para todos</div>
          </div>
          <button style={styles.accessBtn} onClick={() => setHighContrast(!highContrast)} aria-label="Alto contraste">
            {highContrast ? "◑" : "◐"}
          </button>
        </div>
        <div style={styles.navTabs}>
          {[["rutas", "🗺️ Rutas"], ["alertas", "⚠️ Alertas"], ["reportar", "📢 Reportar"]].map(([id, label]) => (
            <div key={id} style={styles.tab(tab === id)} onClick={() => setTab(id)} role="tab" aria-selected={tab === id}>
              {label}
            </div>
          ))}
        </div>
      </div>

      <div style={styles.body}>

        {/* ──── TAB RUTAS ──── */}
        {tab === "rutas" && (
          <>
            <div style={styles.searchBox}>
              <span style={{ fontSize: 16 }}>🔍</span>
              <input
                style={styles.searchInput}
                placeholder="¿A dónde vas hoy?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar destino"
              />
              <button
                className={listening ? "mic-active" : ""}
                style={{ ...styles.micBtn, position: "relative" }}
                onClick={toggleListen}
                aria-label="Activar comando de voz"
              >
                {listening ? "🔴" : "🎙️"}
              </button>
            </div>

            {listening && (
              <div style={{ textAlign: "center", color: COLORS.accent, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                🎙️ Escuchando... di tu destino
              </div>
            )}

            {/* Mini map */}
            <div style={styles.mapPlaceholder}>
              <div style={styles.mapGrid} />
              <div style={styles.mapPin}>📍</div>
              <div style={styles.mapLabel}>Tu ubicación · Bogotá, Colombia</div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>Rutas accesibles sugeridas</div>
              {ROUTES.filter((r) =>
                query === "" || r.name.toLowerCase().includes(query.toLowerCase())
              ).map((route) => (
                <div
                  key={route.id}
                  style={styles.routeCard(route.accessible)}
                  role="button"
                  aria-label={`Ruta: ${route.name}`}
                >
                  <div style={styles.routeHeader}>
                    <div style={styles.routeName}>{route.name}</div>
                    <div style={styles.badge(route.accessible)}>
                      {route.accessible ? "✓ Accesible" : "⚠️ Obstáculos"}
                    </div>
                  </div>
                  <div style={styles.routeFooter}>
                    <span style={styles.routeMeta}>🕐 {route.time}</span>
                    <span style={styles.routeMeta}>📏 {route.distance}</span>
                    {route.hazards > 0 && (
                      <span style={{ ...styles.routeMeta, color: COLORS.warn }}>
                        ⚠️ {route.hazards} alerta{route.hazards > 1 ? "s" : ""}
                      </span>
                    )}
                    <button style={styles.startBtn} onClick={() => handleStartRoute(route)}>
                      Navegar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ──── TAB ALERTAS ──── */}
        {tab === "alertas" && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Reportes recientes en tu zona</div>
            {REPORTS.map((r) => (
              <div key={r.id} style={styles.reportCard(r.severity)} role="article" aria-label={r.type}>
                <div style={styles.reportIcon}>{r.icon}</div>
                <div style={styles.reportInfo}>
                  <div style={styles.reportType}>{r.type}</div>
                  <div style={styles.reportLoc}>📍 {r.location}</div>
                  <div style={styles.reportTime}>{r.time}</div>
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: r.severity === "alta" ? COLORS.warn : "#FBBF24",
                  flexShrink: 0,
                }} />
              </div>
            ))}
          </div>
        )}

        {/* ──── TAB REPORTAR ──── */}
        {tab === "reportar" && (
          <div>
            <div style={{ ...styles.sectionTitle, marginBottom: 20 }}>Reportar obstáculo o problema</div>

            {submitted ? (
              <div style={{
                textAlign: "center", padding: "40px 20px",
                background: COLORS.accentSoft, borderRadius: 20, border: `1px solid ${COLORS.accent}44`,
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.accent }}>¡Reporte enviado!</div>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 6 }}>
                  Gracias. Ayudas a hacer Bogotá más accesible.
                </div>
              </div>
            ) : (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tipo de problema</label>
                  <div style={styles.optionGrid}>
                    {ISSUE_TYPES.map((type) => (
                      <button
                        key={type}
                        style={styles.optionBtn(reportType === type)}
                        onClick={() => setReportType(type)}
                        aria-pressed={reportType === type}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Ubicación (dirección o descripción)</label>
                  <input
                    style={styles.input}
                    placeholder="Ej: Cra 15 con Cll 85, cerca del semáforo"
                    value={reportLoc}
                    onChange={(e) => setReportLoc(e.target.value)}
                    aria-label="Ubicación del problema"
                  />
                </div>

                <div style={{ ...styles.formGroup, display: "flex", alignItems: "center", gap: 10 }}>
                  <button style={styles.micBtn} onClick={toggleListen} aria-label="Reportar por voz">
                    {listening ? "🔴" : "🎙️"}
                  </button>
                  <span style={{ fontSize: 13, color: COLORS.textMuted }}>
                    {listening ? "Escuchando tu reporte..." : "O reporta por voz"}
                  </span>
                </div>

                <button
                  style={{ ...styles.submitBtn, opacity: reportType ? 1 : 0.5 }}
                  onClick={handleSubmitReport}
                  disabled={!reportType}
                  aria-label="Enviar reporte"
                >
                  📢 Enviar reporte
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* FAB */}
      <div style={styles.fabContainer}>
        <button style={styles.fab} onClick={() => setShowReport(true)} aria-label="Activar modo navegación con audio">
          <span style={{ fontSize: 20 }}>🔊</span>
          Activar navegación con audio
        </button>
      </div>

      {/* ──── NAVIGATION MODAL ──── */}
      {activeRoute && (
        <div style={styles.modal} role="dialog" aria-label="Navegación activa">
          <div style={styles.modalContent}>
            <div style={styles.modalHandle} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 700, letterSpacing: 1 }}>NAVEGANDO</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{activeRoute.name}</div>
              </div>
              <button
                onClick={() => setActiveRoute(null)}
                style={{ background: COLORS.warnSoft, border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", color: COLORS.warn, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                aria-label="Cerrar navegación"
              >
                ✕
              </button>
            </div>

            <div style={styles.progressBar}>
              <div style={styles.progressFill(((activeStep + 1) / activeRoute.steps.length) * 100)} />
            </div>

            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>
              Paso {activeStep + 1} de {activeRoute.steps.length}
            </div>

            {activeRoute.steps.map((step, i) => (
              <div
                key={step.id}
                style={styles.stepItem(i === activeStep)}
                onClick={() => setActiveStep(i)}
                role="button"
                aria-current={i === activeStep ? "step" : undefined}
                aria-label={step.text}
              >
                <div style={styles.stepIcon}>{step.icon}</div>
                <div style={styles.stepText}>{step.text}</div>
              </div>
            ))}

            <button
              style={{ ...styles.submitBtn, marginTop: 20 }}
              onClick={handleNextStep}
              aria-label={activeStep < activeRoute.steps.length - 1 ? "Siguiente paso" : "Finalizar ruta"}
            >
              {activeStep < activeRoute.steps.length - 1 ? "Siguiente paso →" : "✅ Finalizar ruta"}
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}