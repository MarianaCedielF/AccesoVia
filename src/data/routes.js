export const ROUTES = [
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

export const ISSUE_TYPES = [
  { label: "Obstáculo en acera", icon: "🚧" },
  { label: "Semáforo dañado", icon: "🔔" },
  { label: "Rampa bloqueada", icon: "♿" },
  { label: "Piso táctil dañado", icon: "🦯" },
  { label: "Falta de señalización", icon: "⚠️" },
  { label: "Otro", icon: "📝" },
];
