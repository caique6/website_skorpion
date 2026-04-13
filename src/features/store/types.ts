export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "gamer" | "escolar";
  image_url: string | null;
  url: string;
  featured: boolean;
  active: boolean;
  position: number;
}

export interface StoreData {
  products: StoreProduct[];
}