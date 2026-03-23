import { COLORS, APP_NAME } from "../styles/colors";

const TABS = [
  { id: "rutas", label: "🗺️ Rutas" },
  { id: "alertas", label: "⚠️ Alertas" },
  { id: "reportar", label: "📢 Reportar" },
];

export default function Header({ activeTab, onTabChange, highContrast, onToggleContrast }) {
  return (
    <header
      style={{
        background: "linear-gradient(135deg, #0A0F1E 0%, #0D1929 100%)",
        borderBottom: `1px solid ${COLORS.cardBorder}`,
        padding: "20px 20px 0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              background: `linear-gradient(90deg, ${COLORS.accent}, #60C9FF)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: -0.5,
            }}
          >
            {APP_NAME}
          </div>
          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>
            Bogotá accesible para todos
          </div>
        </div>
        <button
          style={{
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
          }}
          onClick={onToggleContrast}
          aria-label="Alternar alto contraste"
          title={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
        >
          {highContrast ? "◑" : "◐"}
        </button>
      </div>

      <nav style={{ display: "flex", gap: 0, marginTop: 4 }} role="tablist" aria-label="Navegación principal">
        {TABS.map(({ id, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(id)}
              style={{
                flex: "1 1 0",
                minWidth: 0,
                padding: "10px 0",
                textAlign: "center",
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? COLORS.accent : COLORS.textMuted,
                background: "none",
                border: "none",
                borderBottom: `2px solid ${isActive ? COLORS.accent : "transparent"}`,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: "inherit",
              }}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
