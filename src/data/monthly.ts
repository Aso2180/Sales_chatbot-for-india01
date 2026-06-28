export const MO = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05'] as const;
export const ML = ['1月', '2月', '3月', '4月', '5月'];

export type MonthKey = typeof MO[number];

export interface MonthlyData {
  cbm: number;
  cont: number;
  f20: number;
  f40h: number;
  profit: number;
  ship: number;
  stratCBM: number;
}

export const monthly: Record<MonthKey, MonthlyData> = {
  '2026-01': { cbm: 217.3, cont: 14, f20: 6,  f40h: 8,  profit:  1364770, ship: 10, stratCBM: 6.9  },
  '2026-02': { cbm: 364.4, cont: 24, f20: 15, f40h: 9,  profit:   980654, ship: 20, stratCBM: 34.6 },
  '2026-03': { cbm: 267.1, cont: 20, f20: 12, f40h: 8,  profit:  -704542, ship: 17, stratCBM: 17.5 },
  '2026-04': { cbm: 456.5, cont: 26, f20: 11, f40h: 15, profit:   167506, ship: 20, stratCBM: 45.2 },
  '2026-05': { cbm: 413.0, cont: 25, f20: 15, f40h: 10, profit:  1524454, ship: 21, stratCBM: 32.6 },
};
