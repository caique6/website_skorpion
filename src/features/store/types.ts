export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "gamer" | "escolar";
  image: string;
  url: string;
}

export interface StoreData {
  products: StoreProduct[];
}