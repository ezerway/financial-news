export interface GoldPrice {
  masp: string;
  tensp: string;
  giaban: number;
  giamua: number;
}

export interface OilPrice {
  id: number;
  created_at: string;
  updated_at: string;
  petrolimex_id: string;
  date: string;
  title: string;
  zone1_price: number;
  zone2_price: number;
}

export interface SoccerMatch {
  serie?: string;
  title?: string;
  sortTitle?: string;
  start?: string;
  startDate?: string;
  startTime?: string;
  winMarketOutcomePrices?: string[];
  drawMarketOutcomePrices?: string[];
  lossMarketOutcomePrices?: string[];
}
