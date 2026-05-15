export type CityMonthly = {
  month: string;
  recovered: number;
  landfill: number;
  rate: number;
};

export type CityComposition = {
  name: string;
  value: number;
  color: string;
};

export type CitySector = {
  sector: string;
  pct: number;
};

export type CityCenter = {
  name: string;
  neighborhood: string;
  capacityT: number;
};

export type City = {
  id: string;
  slug: string;
  name: string;
  state: string;
  period: string;
  isActive: boolean;
  displayOrder: number;

  current: {
    diversionRate: number;
    monthlyWasteT: number;
    recoveredT: number;
    landfillT: number;
    sortingCenters: number;
  };

  cumulative: {
    totalKg: number;
    landfillKg: number;
    recoveredKg: number;
    diversionRate: number;
    co2AvoidedKg: number;
    savingsBRL: number;
  };

  goalJune2026: number;

  monthly: CityMonthly[];
  composition: CityComposition[];
  sectors: CitySector[];
  centers: CityCenter[];

  bannerImageUrl?: string;
  mapImageUrl?: string;
};
