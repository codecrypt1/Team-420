type StatusesKeys = "OPEN" | "DISPATCHED" | "RESOLVED";

export interface Geocode {
  lat: number;
  lng: number;
}

export type CallData = {
  order_price: any;
  coordinates: { lat: any; lng: any };
  items: any;
  key: string;
  unique_id: string;
  order_tittle: string;
  streamSid: string;
  name: string;
  order_quantity: any;
  location?: string;
  geocode?: Geocode;
  phone_no: string;
  live: boolean;
  status: StatusesKeys;
  transcript?: string;
  dateCreated: string;
  dateDisconnected?: string;
};
