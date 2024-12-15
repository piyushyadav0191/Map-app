export interface Hospital {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface OverpassNode {
  type: "node";
  id: number;
  lat: number;
  lon: number;
  tags?: {
    name?: string;
    address?: string;
    amenity?: string;
  };
}
