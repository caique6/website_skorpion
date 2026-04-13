import { supabaseClient } from "@/lib/supabase";
import { StoreData } from "../types";

export const getStoreData = async (): Promise<StoreData> => {
  const { data, error } = await supabaseClient
    .from("store_products")
    .select("id, name, description, price, category, image_url, url, featured, active, position")
    .eq("active", true)
    .order("position", { ascending: true });

  if (error || !data) return { products: [] };

  return { products: data };
};