export const NETWORK = {
  cities: {
    PR: [
      "Andirá", "Bandeirantes", "Barra do Jacaré", "Cambará", "Carlópolis",
      "Ibaiti", "Itambaracá", "Jacarezinho", "Jaboti", "Joaquim Távora",
      "Ribeirão Claro", "Santo Antônio da Platina", "Siqueira Campos", "Wenceslau Braz",
    ],
    SP: ["Boituva", "Cerquilho", "Iperó", "Itararé", "Ourinhos"],
  },
  contact: {
    email: "atendimento@reciclometrodacidade.com.br",
    phone: "(43) 99107-2050",
    instagram: "@reciclometrodacidade",
  },
};

export const JACAREZINHO = {
  city: "Jacarezinho",
  state: "PR",
  period: "Março de 2026",
  current: {
    diversionRate: 11,
    monthlyWaste: 800,
    recovered: 90,
    landfill: 710,
    sortingCenters: 4,
  },
  cumulative: {
    totalKg: 632711,
    landfillKg: 548952,
    recoveredKg: 83759,
    diversionRate: 13.2,
    co2AvoidedKg: 170496,
    savingsBRL: 280145,
  },
  goalJune2026: 25,
  monthly: [
    { month: "Out/25", recovered: 62, landfill: 738, rate: 7.8 },
    { month: "Nov/25", recovered: 68, landfill: 732, rate: 8.5 },
    { month: "Dez/25", recovered: 71, landfill: 729, rate: 8.9 },
    { month: "Jan/26", recovered: 78, landfill: 722, rate: 9.8 },
    { month: "Fev/26", recovered: 84, landfill: 716, rate: 10.5 },
    { month: "Mar/26", recovered: 90, landfill: 710, rate: 11.3 },
  ],
  composition: [
    { name: "Orgânico", value: 48, color: "#65a30d" },
    { name: "Plástico", value: 18, color: "#15803d" },
    { name: "Papel/Papelão", value: 14, color: "#a3e635" },
    { name: "Metal", value: 4, color: "#fbbf24" },
    { name: "Vidro", value: 5, color: "#0ea5e9" },
    { name: "Rejeito", value: 11, color: "#737373" },
  ],
  centers: [
    { name: "Central Norte", neighborhood: "Vila Setti", capacityT: 28 },
    { name: "Central Sul", neighborhood: "Aeroporto", capacityT: 24 },
    { name: "Central Leste", neighborhood: "Pavan", capacityT: 22 },
    { name: "Central Centro", neighborhood: "Centro", capacityT: 16 },
  ],
  sectors: [
    { sector: "Centro", pct: 22 },
    { sector: "Vila Setti", pct: 18 },
    { sector: "Aeroporto", pct: 14 },
    { sector: "Pavan", pct: 12 },
    { sector: "Nova Jacarezinho", pct: 11 },
    { sector: "Demais bairros", pct: 23 },
  ],
};
