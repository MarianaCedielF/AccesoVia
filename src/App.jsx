import { useState } from "react";
import { COLORS } from "./styles/colors";
import Header from "./components/Header";
import NavigationModal from "./components/NavigationModal";
import FloatingButton from "./components/FloatingButton";
import RoutesTab from "./pages/RoutesTab";
import AlertsTab from "./pages/AlertsTab";
import ReportTab from "./pages/ReportTab";

export default function AccesoVia() {
  const [tab, setTab] = useState("rutas");
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [listening, setListening] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
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
          onTabChange={setTab}
          highContrast={highContrast}
          onToggleContrast={() => setHighContrast((c) => !c)}
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

          {tab === "alertas" && <AlertsTab />}

          {tab === "reportar" && (
            <ReportTab
              listening={listening}
              onToggleListen={handleToggleListen}
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
      </div>
    </div>
  );
}
