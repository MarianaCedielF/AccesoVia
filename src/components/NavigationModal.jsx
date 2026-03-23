import { COLORS } from "../styles/colors";

export default function NavigationModal({ route, activeStep, onNextStep, onClose, onSelectStep }) {
  const progress = ((activeStep + 1) / route.steps.length) * 100;
  const isLastStep = activeStep >= route.steps.length - 1;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Navegación activa"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          background: COLORS.card,
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          padding: "24px 20px 48px",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* Handle bar */}
        <div
          style={{
            width: 40,
            height: 4,
            background: COLORS.cardBorder,
            borderRadius: 2,
            margin: "0 auto 20px",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 700, letterSpacing: 1 }}>
              NAVEGANDO
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{route.name}</div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: COLORS.warnSoft,
              border: "none",
              borderRadius: 10,
              width: 36,
              height: 36,
              cursor: "pointer",
              color: COLORS.warn,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontFamily: "inherit",
            }}
            aria-label="Cerrar navegación"
          >
            ✕
          </button>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 4,
            background: COLORS.cardBorder,
            borderRadius: 2,
            marginBottom: 8,
            overflow: "hidden",
          }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progreso de ruta: ${Math.round(progress)}%`}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${COLORS.accent}, #00B4D8)`,
              borderRadius: 2,
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>
          Paso {activeStep + 1} de {route.steps.length}
        </div>

        {/* Steps */}
        <div>
          {route.steps.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <div
                key={step.id}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px",
                  borderRadius: 14,
                  background: isActive ? COLORS.accentSoft : "transparent",
                  border: `1px solid ${isActive ? COLORS.accent + "44" : "transparent"}`,
                  marginBottom: 8,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  opacity: i < activeStep ? 0.5 : 1,
                }}
                onClick={() => onSelectStep(i)}
                role="button"
                aria-current={isActive ? "step" : undefined}
                aria-label={`Paso ${i + 1}: ${step.text}`}
              >
                <div
                  style={{
                    fontSize: 22,
                    width: 40,
                    height: 40,
                    background: COLORS.bg,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {i < activeStep ? "✓" : step.icon}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.5, paddingTop: 4 }}>{step.text}</div>
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <button
          style={{
            width: "100%",
            background: isLastStep
              ? `linear-gradient(135deg, ${COLORS.ok}, #059669)`
              : `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
            border: "none",
            borderRadius: 14,
            padding: "15px",
            color: "#000",
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            marginTop: 20,
            fontFamily: "inherit",
          }}
          onClick={onNextStep}
          aria-label={isLastStep ? "Finalizar ruta" : "Siguiente paso"}
        >
          {isLastStep ? "✅ Finalizar ruta" : "Siguiente paso →"}
        </button>
      </div>
    </div>
  );
}
