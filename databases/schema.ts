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

export interface GasPrice {
  id: number;
  created_at: string;
  updated_at: string;
  zone_id: number;
  date: string;
  title: string;
  type_1_price: number;
  type_2_price: number;
}
