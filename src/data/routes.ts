import { MO, MonthKey } from './monthly';

export const RNAMES: Record<string, string> = {
  'JPNGO-INMAA': '名古屋→Chennai',
  'JPUKB-INNSA': '神戸→Nhava Sheva',
  'JPTYO-INNSA': '東京→Nhava Sheva',
  'JPYOK-INNSA': '横浜→Nhava Sheva',
  'JPTYO-INMAA': '東京→Chennai',
  'JPUKB-INMAA': '神戸→Chennai',
};

export const RCOLS = ['#0e7bbf', '#f59e0b', '#14b8a6', '#8b5cf6', '#ef4444', '#f97316'];
export const STRAT = ['JPUKB-INMAA'];

export interface RouteMonth {
  cbm: number;
  f20: number;
  f40h: number;
  p: number;
}

export interface RouteData {
  cbm: number;
  cont: number;
  f20: number;
  f40h: number;
  profit: number;
  ship: number;
  bm: Partial<Record<MonthKey, RouteMonth>>;
}

export const routes: Record<string, RouteData> = {
  'JPNGO-INMAA': {
    cbm: 681.5, cont: 35, f20: 10, f40h: 25, profit: 2729692, ship: 28,
    bm: {
      '2026-01': { cbm: 117.9, f20: 1, f40h: 6, p:  1031995 },
      '2026-02': { cbm:  98.1, f20: 3, f40h: 3, p:   451796 },
      '2026-03': { cbm: 139.8, f20: 2, f40h: 5, p:   647247 },
      '2026-04': { cbm: 179.1, f20: 2, f40h: 6, p:   173568 },
      '2026-05': { cbm: 146.6, f20: 2, f40h: 5, p:   425086 },
    },
  },
  'JPUKB-INNSA': {
    cbm: 287.8, cont: 20, f20: 10, f40h: 10, profit: -1547582, ship: 16,
    bm: {
      '2026-01': { cbm: 28.6, f20: 1, f40h: 1, p:  -185481 },
      '2026-02': { cbm: 90.4, f20: 2, f40h: 3, p:  -162711 },
      '2026-03': { cbm: 29.5, f20: 2, f40h: 1, p:  -453887 },
      '2026-04': { cbm: 57.5, f20: 0, f40h: 4, p:  -583873 },
      '2026-05': { cbm: 81.9, f20: 5, f40h: 1, p:  -161630 },
    },
  },
  'JPTYO-INNSA': {
    cbm: 266.4, cont: 13, f20: 7, f40h: 6, profit: 2069599, ship: 11,
    bm: {
      '2026-01': { cbm: 46.6, f20: 1, f40h: 1, p:  371256 },
      '2026-02': { cbm: 25.5, f20: 2, f40h: 0, p:   58789 },
      '2026-03': { cbm: 48.4, f20: 2, f40h: 1, p:   71347 },
      '2026-04': { cbm: 84.7, f20: 1, f40h: 2, p:  709672 },
      '2026-05': { cbm: 61.2, f20: 1, f40h: 2, p:  858535 },
    },
  },
  'JPYOK-INNSA': {
    cbm: 187.4, cont: 11, f20: 8, f40h: 3, profit: 2755267, ship: 10,
    bm: {
      '2026-01': { cbm: 14.2, f20: 1, f40h: 0, p:  308198 },
      '2026-02': { cbm: 67.0, f20: 2, f40h: 1, p: 1159091 },
      '2026-03': { cbm: 13.4, f20: 1, f40h: 0, p:  139195 },
      '2026-04': { cbm: 47.4, f20: 2, f40h: 1, p:  595024 },
      '2026-05': { cbm: 45.6, f20: 2, f40h: 1, p:  553759 },
    },
  },
  'JPTYO-INMAA': {
    cbm: 158.3, cont: 18, f20: 15, f40h: 3, profit: -2354812, ship: 18,
    bm: {
      '2026-01': { cbm:  3.2, f20: 1, f40h: 0, p:  -184354 },
      '2026-02': { cbm: 48.9, f20: 3, f40h: 2, p:  -439828 },
      '2026-03': { cbm: 18.6, f20: 4, f40h: 0, p:  -906088 },
      '2026-04': { cbm: 42.6, f20: 5, f40h: 0, p:  -943982 },
      '2026-05': { cbm: 45.1, f20: 2, f40h: 1, p:   119440 },
    },
  },
  'JPUKB-INMAA': {
    cbm: 136.8, cont: 12, f20: 9, f40h: 3, profit: -319322, ship: 12,
    bm: {
      '2026-01': { cbm:  6.9, f20: 1, f40h: 0, p:   23156 },
      '2026-02': { cbm: 34.6, f20: 3, f40h: 0, p:  -86483 },
      '2026-03': { cbm: 17.5, f20: 1, f40h: 1, p: -202356 },
      '2026-04': { cbm: 45.2, f20: 1, f40h: 2, p:  217097 },
      '2026-05': { cbm: 32.6, f20: 3, f40h: 0, p: -270736 },
    },
  },
};

export const routeKeys = Object.keys(routes);
