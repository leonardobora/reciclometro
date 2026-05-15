import "server-only";
import { wixDataQuery, isWixConfigured } from "./wix";
import { JACAREZINHO } from "./data";
import type { City } from "./types";

const LOCAL_FALLBACK: City[] = [
  {
    id: "jacarezinho",
    slug: "jacarezinho",
    name: JACAREZINHO.city,
    state: JACAREZINHO.state,
    period: JACAREZINHO.period,
    isActive: true,
    displayOrder: 1,
    current: {
      diversionRate: JACAREZINHO.current.diversionRate,
      monthlyWasteT: JACAREZINHO.current.monthlyWaste,
      recoveredT: JACAREZINHO.current.recovered,
      landfillT: JACAREZINHO.current.landfill,
      sortingCenters: JACAREZINHO.current.sortingCenters,
    },
    cumulative: {
      totalKg: JACAREZINHO.cumulative.totalKg,
      landfillKg: JACAREZINHO.cumulative.landfillKg,
      recoveredKg: JACAREZINHO.cumulative.recoveredKg,
      diversionRate: JACAREZINHO.cumulative.diversionRate,
      co2AvoidedKg: JACAREZINHO.cumulative.co2AvoidedKg,
      savingsBRL: JACAREZINHO.cumulative.savingsBRL,
    },
    goalJune2026: JACAREZINHO.goalJune2026,
    monthly: JACAREZINHO.monthly,
    composition: JACAREZINHO.composition,
    sectors: JACAREZINHO.sectors,
    centers: JACAREZINHO.centers,
    bannerImageUrl: "https://static.wixstatic.com/media/10cb84_55887738e15546cfac40e2fb894ec01a~mv2.png",
    mapImageUrl: "https://static.wixstatic.com/media/10cb84_8ec76029eed04eb2b0362880921e2717~mv2.png",
  },
];

type WixCityRow = Record<string, unknown> & { _id?: string };

function mapRowToCity(d: WixCityRow): City | null {
  const slug = String(d.slug ?? d._id ?? "");
  if (!slug) return null;
  return {
    id: String(d._id ?? slug),
    slug,
    name: String(d.name ?? slug),
    state: String(d.state ?? ""),
    period: String(d.period ?? ""),
    isActive: Boolean(d.isActive ?? true),
    displayOrder: Number(d.displayOrder ?? 0),
    current: {
      diversionRate: Number(d.currentDiversionRate ?? 0),
      monthlyWasteT: Number(d.currentMonthlyWasteT ?? 0),
      recoveredT: Number(d.currentRecoveredT ?? 0),
      landfillT: Number(d.currentLandfillT ?? 0),
      sortingCenters: Number(d.currentSortingCenters ?? 0),
    },
    cumulative: {
      totalKg: Number(d.cumulativeTotalKg ?? 0),
      landfillKg: Number(d.cumulativeLandfillKg ?? 0),
      recoveredKg: Number(d.cumulativeRecoveredKg ?? 0),
      diversionRate: Number(d.cumulativeDiversionRate ?? 0),
      co2AvoidedKg: Number(d.cumulativeCo2AvoidedKg ?? 0),
      savingsBRL: Number(d.cumulativeSavingsBRL ?? 0),
    },
    goalJune2026: Number(d.goalJune2026 ?? 0),
    monthly: (d.monthly as City["monthly"]) ?? [],
    composition: (d.composition as City["composition"]) ?? [],
    sectors: (d.sectors as City["sectors"]) ?? [],
    centers: (d.centers as City["centers"]) ?? [],
    bannerImageUrl: (d.bannerImageUrl as string) || undefined,
    mapImageUrl: (d.mapImageUrl as string) || undefined,
  };
}

export async function listCities(): Promise<City[]> {
  "use cache";
  if (!isWixConfigured()) return LOCAL_FALLBACK;
  try {
    const rows = await wixDataQuery<WixCityRow>("cities", { sort: [{ fieldName: "displayOrder", order: "ASC" }] });
    const mapped = rows.map(mapRowToCity).filter((c): c is City => c !== null && c.isActive);
    return mapped.length ? mapped : LOCAL_FALLBACK;
  } catch (err) {
    console.warn("[cities-source] Wix fetch failed, using local fallback:", err);
    return LOCAL_FALLBACK;
  }
}

export async function getCity(slug: string): Promise<City | null> {
  const all = await listCities();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function listCitySlugs(): Promise<string[]> {
  const all = await listCities();
  return all.map((c) => c.slug);
}

export const dataSource = () => (isWixConfigured() ? "wix" : "local");
