import { StoreData } from "../types";

export const STORE_MOCK: StoreData = {
  products: [
    {
      id: "p-01",
      name: "Headset Skorpion Pro",
      description: "Som surround 7.1, microfone retrátil e almofadas respiráveis para longas sessões.",
      price: "R$ 299,90",
      category: "gamer",
      image: "/images/product-headset.jpg",
      url: "https://www.youtube.com/@SkorpionOFICIAL",
    },
    {
      id: "p-02",
      name: "Mochila Tática Skorpion",
      description: "Compartimento para notebook 17\", porta USB embutida e tecido resistente à água.",
      price: "R$ 189,90",
      category: "escolar",
      image: "/images/product-mochila.jpg",
      url: "https://www.youtube.com/@SkorpionOFICIAL",
    },
    {
      id: "p-03",
      name: "Mousepad XL Edição Limitada",
      description: "Surface de tecido premium 90x40cm com base antiderrapante e bordas costuradas.",
      price: "R$ 89,90",
      category: "gamer",
      image: "/images/product-mousepad.jpg",
      url: "https://www.youtube.com/@SkorpionOFICIAL",
    },
  ],
};