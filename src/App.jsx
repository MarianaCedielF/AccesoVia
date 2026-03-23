import { useState } from "react";
import { COLORS } from "./styles/colors";
import { REPORTS } from "./data/reports";
import { ISSUE_TYPES } from "./data/routes";
import Header from "./components/Header";
import NavigationModal from "./components/NavigationModal";
import FloatingButton from "./components/FloatingButton";
import RoutesTab from "./pages/RoutesTab";
import AlertsTab from "./pages/AlertsTab";
import ReportTab from "./pages/ReportTab";

const HIGH_SEVERITY_TYPES = ["Obstáculo en acera", "Rampa bloqueada"];

export default function AccesoVia() {
  const [tab, setTab] = useState("rutas");
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [listening, setListening] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  const [query, setQuery] = useState("");
  const [reports, setReports] = useState(REPORTS);
  const [newAlertCount, setNewAlertCount] = useState(0);
  const [completedRoute, setCompletedRoute] = useState(null);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    if (newTab === "alertas") setNewAlertCount(0);
  };

  const handleAddReport = (newReport) => {
    const severity = HIGH_SEVERITY_TYPES.includes(newReport.type) ? "alta" : "media";
    const issueType = ISSUE_TYPES.find((t) => t.label === newReport.type);
    setReports((prev) => [{ ...newReport, severity, icon: issueType?.icon ?? "📝" }, ...prev]);
    setNewAlertCount((n) => n + 1);
    setTab("alertas");
  };

  const handleStartRoute = (route) => {
    setActiveRoute(route);
    setActiveStep(0);
  };

  const handleNextStep = () => {
    if (activeStep < activeRoute.steps.length - 1) {
      setActiveStep((s) => s + 1);
    } else {
      const finished = activeRoute;
      setActiveRoute(null);
      setCompletedRoute(finished);
      setTimeout(() => setCompletedRoute(null), 3000);
    }
  };

  const handleToggleListen = () => {
    setListening((l) => !l);
    if (!listening) {
      setTimeout(() => setListening(false), 3000);
    }
  };

  return (
    <div
      style={{
        background: "#444",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
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
          ...(highContrast ? { filter: "invert(1) hue-rotate(180deg)" } : {}),
        }}
      >
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
          .map-pin {
            animation: pulse 2s infinite;
          }
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

        <Header
          activeTab={tab}
          onTabChange={handleTabChange}
          highContrast={highContrast}
          onToggleContrast={() => setHighContrast((c) => !c)}
          newAlertCount={newAlertCount}
        />

        <main
          style={{
            padding: "20px 16px",
            paddingBottom: 100,
            width: "100%",
            boxSizing: "border-box",
            flex: 1,
          }}
        >
          {tab === "rutas" && (
            <RoutesTab
              query={query}
              onQueryChange={setQuery}
              listening={listening}
              onToggleListen={handleToggleListen}
              onStartRoute={handleStartRoute}
            />
          )}

          {tab === "alertas" && <AlertsTab reports={reports} newCount={newAlertCount} />}

          {tab === "reportar" && (
            <ReportTab
              listening={listening}
              onToggleListen={handleToggleListen}
              onAddReport={handleAddReport}
            />
          )}
        </main>

        <FloatingButton
          audioActive={audioActive}
          onClick={() => setAudioActive((a) => !a)}
        />

        {activeRoute && (
          <NavigationModal
            route={activeRoute}
            activeStep={activeStep}
            onNextStep={handleNextStep}
            onClose={() => setActiveRoute(null)}
            onSelectStep={setActiveStep}
          />
        )}

        {completedRoute && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
            role="status"
            aria-live="assertive"
          >
            <div
              style={{
                background: COLORS.card,
                borderRadius: 24,
                padding: "40px 32px",
                textAlign: "center",
                maxWidth: 320,
                border: `1px solid ${COLORS.ok}44`,
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.ok, marginBottom: 8 }}>
                ¡Llegaste!
              </div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.5 }}>
                {completedRoute.name}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
